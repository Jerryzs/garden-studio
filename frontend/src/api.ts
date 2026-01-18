const URL = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000'

const $fetch = async <T>(path: string, body?: unknown): Promise<T | { message: string }> => {
  const response = body
    ? await fetch(`${URL}${path}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
      })
    : await fetch(`${URL}${path}`, { credentials: 'include' })

  const json = await response.json()

  if (response.status === 500) {
    console.error(json.message)
    return { message: 'Server crashed. Please try again later.' }
  }

  return json
}

export interface User {
  username: string
  name: string
  privilege: number
}

export const auth = (username: string, password: string, name?: string) =>
  $fetch<null>('/user', { username, password, name })
export const getUser = () => $fetch<User>('/user')
export const logout = () => $fetch<null>('/user/logout')
