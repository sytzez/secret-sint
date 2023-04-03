export const call =
  (baseUrl: string) =>
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
      .then((response) => response.json())
      .catch((e) => {
        console.error(e)
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
