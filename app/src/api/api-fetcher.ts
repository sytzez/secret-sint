import { ApiParams } from './create-api'

const authErrorStatusCodes = [401, 403]

export const apiFetcher =
  ({ baseUrl, onAuthError }: ApiParams) =>
  (method: 'POST' | 'GET' | 'DELETE' | 'PATCH') =>
  (route: string, body: object | null = null) =>
    fetch(`${baseUrl}/${route}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    })
      .then((response) => {
        if (authErrorStatusCodes.includes(response.status)) {
          onAuthError()
          throw new Error('You need to be logged in to do this.')
        }
        return response.json()
      })
      .catch(() => {
        throw new Error('Something went wrong, try again later')
      })
      .then((response) => {
        if (response.error) {
          throw new Error(response.error)
        }
        if (!response.success) {
          throw new Error(response.message)
        }
        return response
      })
