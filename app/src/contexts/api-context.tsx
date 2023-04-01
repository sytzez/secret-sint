import { createContext, ReactNode, useContext } from 'react'
import { AuthContext } from './auth-context'
import { SignUpRequest } from '../schemata/sign-up-request'
import { LogInRequest } from '../schemata/log-in-request'
import { Group, groupSchema } from '../schemata/group'
import { GroupRequest } from '../schemata/group-request'

export interface Api {
  signUp: (request: SignUpRequest) => void
  logIn: (request: LogInRequest) => void
  groups: () => Promise<Group[]>
  createGroup: (request: GroupRequest) => Promise<Group>
  group: (id: number) => Promise<Group>
}

export const ApiContext = createContext(null as unknown as Api)

const API_BASE = 'http://127.0.0.1:3000'

export function ApiContextProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useContext(AuthContext)

  const apiRequest =
    (method: 'POST' | 'GET') =>
    (route: string, body: object | null = null) =>
      fetch(`${API_BASE}/${route}`, {
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

  const post = apiRequest('POST')
  const get = apiRequest('GET')

  const api: Api = {
    signUp: async (request) => {
      const response = await post('signup', { user: request })
      setAuthState({ userId: response.data.id })
    },
    logIn: async (request) => {
      const response = await post('login', { user: request })
      setAuthState({ userId: response.data.id })
    },
    groups: async () => {
      const response = await get('groups')
      return response.data.map((group: object) => groupSchema.parse(group))
    },
    createGroup: async (request) => {
      const response = await post('groups', { group: request })
      return groupSchema.parse(response.data)
    },
    group: async (id) => {
      const response = await get(`groups/${id}`)
      return groupSchema.parse(response.data)
    },
  }

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
