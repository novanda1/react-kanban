export type Todo = {
  id: number
  title: string
  description: string
  created_by: string
  created_at: string
  updated_at: string
}

export type Item = {
  id: number
  name: string
  done: any
  todo_id: number
  created_at: string
  updated_at: string
  progress_percentage: number | null
}

export type CreateTodoDto = {
  title: string
  description: string
}

export type CreateItemDto = {
  name: string
  progress_percentage: number
}

export type UpdateItemDto = {
  target_todo_id: number
  name?: string
}

class Api {
  static tokenKey = 'token'
  /**
   * We need to save this in .env
   * if our web have separate backend between development and production
   * so, on the production we changes the baseUrl to production backend
   *
   * Since we didnt have any production backend, lets just hardcode it
   */
  static baseUrl = 'https://todo-api-18-140-52-65.rakamin.com/'

  static async request<T extends any>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const headers = new Headers({
      ...init?.headers,
      Accept: '*/*',
      'Content-Type': 'application/json',
    })

    /**
     * Get token from localStorage if exist
     * Or
     */
    let token =
      localStorage?.getItem(Api.tokenKey) || (await Api.getOrRenewToken()) || ''

    if (token) headers.append('Authorization', `Bearer ${token}`)

    return fetch(Api.baseUrl + path, {
      ...init,
      headers,
    }).then((result) => {
      /**
       * When the response status is 422
       * We should refresh the users token
       */
      if (result.status === 422) Api.getOrRenewToken()
      return result.json()
    })
  }

  /**
   * This function may not clear
   * because we signup every time when token expired
   * in the real world we need to separate between
   * signup and renew-token
   */
  static async getOrRenewToken(): Promise<string> {
    try {
      const token = await fetch(Api.baseUrl + 'signup', {
        method: 'POST',
        headers: { Accept: '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Noah',
          email: 'novandaahsan2@gmail.com',
          password: 'password',
          password_confirmation: 'password',
        }),
      }).then((response) => response.json())

      localStorage.setItem(Api.tokenKey, token.auth_token)

      return token.auth_token
    } catch (error) {
      alert('failed to get token')
      return ''
    }
  }

  static async getTodos(): Promise<Todo[]> {
    return await Api.request('todos')
  }

  static async createTodo(dto: CreateTodoDto): Promise<Todo | undefined> {
    if (!dto) return
    return await Api.request('todos', {
      body: JSON.stringify(dto),
      method: 'POST',
    })
  }

  static async getItems(todoId: number): Promise<Item[] | undefined> {
    if (!todoId) return
    return await Api.request(`todos/${todoId}/items`)
  }

  static async createItem(
    todoId: number,
    dto: CreateItemDto,
  ): Promise<Item | undefined> {
    if (!todoId || !dto) return
    return await Api.request(`todos/${todoId}/items`, {
      method: 'POST',
      body: JSON.stringify(dto),
    })
  }

  static async updateItem(
    todoId: number,
    itemId: number,
    dto: UpdateItemDto,
  ): Promise<Item | undefined> {
    if (!todoId || !itemId || !dto) return

    return await Api.request(`todos/${todoId}/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
    })
  }

  static async deleteItem(todoId: number, itemId: number) {
    if (!todoId || !itemId) return

    return await Api.request(`todos/${todoId}/items/${itemId}`, {
      method: 'DELETE',
    })
  }
}

export default Api
