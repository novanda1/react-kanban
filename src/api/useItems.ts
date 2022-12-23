import useSWR, { useSWRConfig } from 'swr'
import Api, { CreateItemDto, Item, UpdateItemDto } from './api'
import constants from './constants'

export const useItems = (todoId?: number) => {
  const swrKey = [constants.ITEMS, todoId]

  const { mutate: globalMutation } = useSWRConfig()

  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    todoId ? () => Api.getItems(todoId) : null, // If null it means fetch from cache only.
    {
      onSuccess: (data) => {
        localStorage.setItem(JSON.stringify(swrKey), JSON.stringify(data))
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

  const updateItem = async (
    todoId: number,
    itemId: number,
    dto: UpdateItemDto,
  ) => {
    const prevItems = localStorage.getItem(
      JSON.stringify([constants.ITEMS, todoId]),
    )
    const nextItems = localStorage.getItem(
      JSON.stringify([constants.ITEMS, dto.target_todo_id]),
    )

    const updatedItem = (JSON.parse(prevItems || '') as Item[]).find(
      (item) => item.id !== itemId,
    )

    if (!updateItem) return

    globalMutation(
      [constants.ITEMS, todoId],
      (JSON.parse(prevItems || '') as Item[]).filter(
        (item) => item.id !== updatedItem!.id,
      ),
      {
        populateCache: true,
        revalidate: false,
        // rollbackOnError: true,
      },
    )

    globalMutation(
      [constants.ITEMS, dto.target_todo_id],
      [updatedItem, ...(JSON.parse(nextItems || '') as Item[])],
      {
        optimisticData: true,
        populateCache: true,
        revalidate: false,
        // rollbackOnError: true,
      },
    )
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
    updateItem,
    deleteItem,
  }
}
