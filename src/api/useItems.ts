import useSWR from 'swr'
import Api, { CreateItemDto, UpdateItemDto } from './api'
import constants from './constants'

export const useItems = (todoId: number) => {
  const { data, error, isLoading, mutate } = useSWR(constants.ITEMS, () =>
    Api.getItems(todoId),
  )

  const createItem = async (todoId: number, dto: CreateItemDto) => {
    try {
      const createdItem = await Api.createItem(todoId, dto)
      if (!createdItem) throw new Error(`failed to create item: ${createdItem}`)

      const newItems = [createdItem, ...(data || [])]
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
    try {
      const updatedItem = await Api.updateItem(todoId, itemId, dto)
      if (!updatedItem)
        throw new Error(`failed to update items: ${updatedItem}`)

      const newItems = [updatedItem, ...(data || [])]
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
    updateItem,
    deleteItem,
  }
}
