import useSWR, { useSWRConfig } from 'swr'
import create from 'zustand'
import Api, { CreateItemDto, Item, UpdateItemDto } from './api'
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
    setByTodoId: (todoId: number, items: Item[]) =>
      set((state) => ({
        mapTodoToItems: [...state.mapTodoToItems, { todoId, items }],
      })),
    getByTodoId: (todoId: number) =>
      get().mapTodoToItems.find((item) => item.todoId === todoId),
    updateItem: async ({ destination, itemId, source }: UpdateItemParams) => {
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
  })),
)

export const useItems = (todoId?: number) => {
  const swrKey = [constants.ITEMS, todoId]
  const { setByTodoId, getByTodoId, mapTodoToItems } = useItemLocal()

  const { mutate: globalMutation } = useSWRConfig()

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
