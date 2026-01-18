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

export interface Activity {
  id: number
  name: string
  startdate: string
  starttime: string
  length: string
  capacity: number
  image: string
  approved: number
  location: string
  lat: number
  lon: number
  detail: string
}

export const auth = (username: string, password: string, name?: string) =>
  $fetch<null>('/user', { username, password, name })
export const getUser = () => $fetch<User>('/user')
export const logout = () => $fetch<null>('/user/logout')
export const listAllActivities = () => $fetch<Activity[]>('/activity/all')
export const listUserActivities = () => $fetch<Activity[]>('/activity/list')
export const approveActivity = (id: number | string) => $fetch<Activity[]>('/activity/approve', { id })
