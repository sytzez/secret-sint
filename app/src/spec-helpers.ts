import { expect, Mock, vi } from 'vitest'

let fetchMock: Mock

export const mockFetch = (response: object) => {
  fetchMock = vi.fn(
    () =>
      new Promise((resolve) => {
        const responseObject = {
          status: 200,
          json: () => response,
        }
        resolve(responseObject)
      }),
  )
  global.fetch = fetchMock
}

export const mockUnauthorizedFetch = () => {
  fetchMock = vi.fn(
    () =>
      new Promise((resolve) => {
        const responseObject = {
          status: 401,
          json: () => ({ success: false, message: 'Unauthorized' }),
        }
        resolve(responseObject)
      }),
  )
  global.fetch = fetchMock
}

export const expectFetchCall = (method: string, url: string, body?: object) => {
  expect(fetchMock).toBeCalledWith(url, {
    method,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export const awaitTick = () => new Promise((r) => setTimeout(r))
