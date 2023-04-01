import { createContext, ReactNode, useContext } from 'react'
import { SignUpRequest } from '../schemata/sign-up-request'
import { LogInRequest } from '../schemata/log-in-request'
import { Group, groupSchema } from '../schemata/group'
import { GroupRequest } from '../schemata/group-request'
import { InviteRequest } from '../schemata/invite-request'
import { Participation, participationSchema } from '../schemata/participation'

export interface Api {
  signUp: (request: SignUpRequest) => Promise<void>
  logIn: (request: LogInRequest) => Promise<void>
  groups: () => Promise<Group[]>
  group: (id: number) => Promise<Group>
  createGroup: (request: GroupRequest) => Promise<Group>
  updateGroup: (id: number, request: GroupRequest) => Promise<void>
  leaveGroup: (id: number) => Promise<void>
  invite: (groupId: number, request: InviteRequest) => Promise<void>
  participation: (groupId: number) => Promise<Participation>
  updateParticipation: (groupId: number, request) => Promise<void>
}

export const ApiContext = createContext(null as unknown as Api)

const API_BASE = 'http://127.0.0.1:3000'

export function ApiContextProvider({ children }: { children: ReactNode }) {
  const apiRequest =
    (method: 'POST' | 'GET' | 'DELETE' | 'PATCH') =>
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
  const patch = apiRequest('PATCH')
  const get = apiRequest('GET')
  const del = apiRequest('DELETE')

  const api: Api = {
    signUp: async (request) => {
      await post('signup', { user: request })
    },
    logIn: async (request) => {
      await post('login', { user: request })
    },
    groups: async () => {
      const response = await get('groups')
      return response.data.map((group: object) => groupSchema.parse(group))
    },
    group: async (id) => {
      const response = await get(`groups/${id}`)
      return groupSchema.parse(response.data)
    },
    createGroup: async (request) => {
      const response = await post('groups', { group: request })
      return groupSchema.parse(response.data)
    },
    leaveGroup: async (id: number) => {
      await del(`groups/${id}/participations/own`)
    },
    invite: async (groupId, request) => {
      await post(`groups/${groupId}/participations`, { participation: request })
    },
    participation: async (groupId) => {
      const response = await get(`groups/${groupId}/participations/own`)
      return participationSchema.parse(response.data)
    },
    updateParticipation: async (groupId, request) => {
      await patch(`groups/${groupId}/participations/own`, {
        participation: request,
      })
    },
  }

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
