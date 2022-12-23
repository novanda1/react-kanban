import useSWR from 'swr'
import Api, { CreateTodoDto } from './api'

const useTodos = () => {
  const { data, error, mutate } = useSWR('todos', () => Api.getTodos())

  const createTodo = async (dto: CreateTodoDto) => {
    try {
      const currentTodo = data
      const createdTodo = await Api.createTodo(dto)

      if (!createdTodo) throw new Error(`failed to create todo: ${createTodo}`)

      const newTodos = [createdTodo, ...(currentTodo || [])]
      mutate(newTodos)

      return newTodos
    } catch (error) {
      // handle error here
    }
  }

  return {
    todos: data,
    isError: error,
    createTodo,
  }
}

export default useTodos
