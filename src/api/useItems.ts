import useSWR, { useSWRConfig } from 'swr'
import create from 'zustand'
import Api, { CreateItemDto, Item, UpdateItemDto, UpdateItemValue } from './api'
import constants from './constants'
import { combine } from 'zustand/middleware'
import { produce } from 'immer'

type TodoIdToItems = {
  todoId: number
  items: Item[]
}
type MapTodoIdToItems = TodoIdToItems[]
type UpdateItemParams = {
  itemId: number
  source: {
    todoId: number
    index: number
  }
  destination: {
    todoId: number
    index: number
  }
}
const initialMapTodoIdToItems: MapTodoIdToItems = []

export const useItemLocal = create(
  combine({ mapTodoToItems: initialMapTodoIdToItems }, (set, get) => ({
    setByTodoId: (todoId: number, items: Item[]) => {
      set((state) => {
        const newMapTodoToItems = produce(state.mapTodoToItems, (draft) => {
          const existingIndex = draft.findIndex((t) => t.todoId === todoId)

          if (existingIndex > -1) {
            draft[existingIndex].items = items
          } else {
            draft.push({ todoId, items })
          }
        })

        return {
          mapTodoToItems: newMapTodoToItems,
        }
      })
    },
    getByTodoId: (todoId: number) =>
      get().mapTodoToItems.find((item) => item.todoId === todoId),

    /**
     *
     * @todo The name should be changeOrder or something to make this clear
     * because the function purpose is to move item to another index / another todo
     *
     * note: as this code written on 25-Dec-2022 the backend doesnt support
     * to change item to specific index, move item to specific todo just `push` the item
     * to last index
     */
    updateItem: ({ destination, itemId, source }: UpdateItemParams) => {
      const updatedMapTodoToItems = produce(get().mapTodoToItems, (draft) => {
        const currentTodoIndex = draft.findIndex(
          (m) => m.todoId === source.todoId,
        )
        const nextTodoIndex = draft.findIndex(
          (m) => m.todoId === destination.todoId,
        )

        const targetItem = draft
          .find((t) => t.todoId === source.todoId)
          ?.items.find((item) => item.id === itemId)

        if (!targetItem) return

        draft[currentTodoIndex].items.splice(source.index, 1)
        draft[nextTodoIndex].items.splice(destination.index, 0, targetItem)
      })

      Api.updateItem(source.todoId, itemId, {
        target_todo_id: destination.todoId,
      })

      set({ mapTodoToItems: updatedMapTodoToItems })
    },

    editItem: (
      target: { todoId: number; itemId: number },
      params: UpdateItemValue,
    ) => {
      const updatedMapTodoToItems = produce(get().mapTodoToItems, (draft) => {
        const todoIndex = draft.findIndex((t) => t.todoId === target.todoId)
        const itemIndex = draft[todoIndex].items.findIndex(
          (item) => item.id === target.itemId,
        )

        Object.keys(params).forEach((key) => {
          draft[todoIndex].items[itemIndex][key as keyof UpdateItemValue] =
            params[key as keyof UpdateItemValue]
        })
      })

      Api.updateItem(target.todoId, target.itemId, {
        name: params.name,
        progress_percentage: params.progress_percentage,
      })

      set({ mapTodoToItems: updatedMapTodoToItems })
    },

    removeItemInTodoId: (todoId: number, itemId: number) => {
      const updatedMapTodoToItems = produce(get().mapTodoToItems, (draft) => {
        const todoIndex = draft.findIndex((t) => t.todoId === todoId)
        const itemIndex = draft[todoIndex].items.findIndex(
          (item) => item.id === itemId,
        )

        draft[todoId].items.splice(itemId, 1)
      })
    },
  })),
)

export const useItems = (todoId?: number) => {
  const swrKey = [constants.ITEMS, todoId]
  const { setByTodoId, getByTodoId, mapTodoToItems } = useItemLocal()

  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    todoId ? () => Api.getItems(todoId) : null, // If null it means fetch from cache only.
    {
      onSuccess: (data) => {
        if (todoId && data) setByTodoId(todoId, data)
      },
    },
  )

  const createItem = async (todoId: number, dto: CreateItemDto) => {
    try {
      const createdItem = await Api.createItem(todoId, dto)
      if (!createdItem) throw new Error(`failed to create item: ${createdItem}`)

      const newItems = [...(data || []), createdItem]

      mutate(newItems)
      setByTodoId(todoId, newItems)

      return newItems
    } catch (error) {
      // Handle error here.
    }
  }

  const deleteItem = async (todoId: number, itemId: number) => {
    try {
      await Api.deleteItem(todoId, itemId)
      mutate(data?.filter((item) => item.id !== itemId))
    } catch (error) {
      // Handle error here.
    }
  }

  return {
    items: data,
    isError: error,
    isLoading,
    createItem,
    deleteItem,
  }
}
