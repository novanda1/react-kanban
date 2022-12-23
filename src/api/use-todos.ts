import useSWR from 'swr'

type Todo = {
  id: number
  title: string
  created_by: string
  created_at: string
  updated_at: string
}

type Item = {
  id: number
  name: string
  done: any
  todo_id: number
  created_at: string
  updated_at: string
  progress_percentage: number | null
}

type CreateTodoDto = {
  title: string
  description: string
}

type CreateItemDto = {
  name: string
  progress_percentage: number
}

type UpdateItemDto = {
  target_todo_id: number
  name?: string
}

class API {
  tokenKey = 'token'
  baseUrl = 'https://todo-api-18-140-52-65.rakamin.com/'

  async request<T extends any>(path: string, init?: RequestInit): Promise<T> {
    const token = localStorage?.getItem(this.tokenKey) || ''
    return fetch(this.baseUrl + path, {
      ...init,
      headers: { ...init?.headers, Authorization: `Bearer ${token}` },
    }).then((result) => result.json())
  }

  async getOrRenewToken(): Promise<string> {
    try {
      const token = await this.request<{ message: string; auth_token: string }>(
        'signup',
        {
          method: 'post',
          body: JSON.stringify({
            name: 'Noah',
            email: 'novandaahsan1@gmail.com',
            password: 'password',
            password_confirmation: 'password',
          }),
        },
      )

      localStorage.setItem(this.tokenKey, token.auth_token)

      return token.message
    } catch (error) {
      alert('failed to get token')
      return ''
    }
  }

  async getTodos(): Promise<Todo[]> {
    return await this.request('todos')
  }

  async createTodo(dto: CreateTodoDto): Promise<Todo | undefined> {
    if (!dto) return
    return await this.request('todos', { body: JSON.stringify(dto) })
  }

  async getItems(todoId: number): Promise<Item[] | undefined> {
    if (!todoId) return
    return await this.request(`todos/${todoId}/items`)
  }

  async createItem(
    todoId: number,
    dto: CreateItemDto,
  ): Promise<Item | undefined> {
    if (!todoId || !dto) return
    return await this.request(`todos/${todoId}/items`, {
      method: 'post',
      body: JSON.stringify(dto),
    })
  }

  async updateItem(todoId: number, itemId: number) {}
}

const api = new API()

export const useTodos = () => useSWR('todos', () => api)
