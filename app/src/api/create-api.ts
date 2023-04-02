import { Group, groupSchema } from "../schemata/group";
import { Participation, participationSchema } from "../schemata/participation";
import { SignUpRequest } from '../schemata/sign-up-request'
import { LogInRequest } from '../schemata/log-in-request'
import { GroupRequest } from '../schemata/group-request'
import { InviteRequest } from '../schemata/invite-request'
import { ParticipationRequest } from '../schemata/participation-request'

export type Api = ReturnType<typeof createApi>

export default function createApi(baseUrl: string) {
  const post = apiMethod(baseUrl, 'POST')
  const patch = apiMethod(baseUrl, 'PATCH')
  const get = apiMethod(baseUrl, 'GET')
  const del = apiMethod(baseUrl, 'DELETE')

  return {
    signUp: async (request: SignUpRequest) => {
      await post('signup', { user: request })
    },
    logIn: async (request: LogInRequest) => {
      await post('login', { user: request })
    },
    groups: async (): Promise<Group[]> => {
      const response = await get('groups')
      return response.data.map((group: object) => groupSchema.parse(group))
    },
    group: async (id: number): Promise<Group> => {
      const response = await get(`groups/${id}`)
      return groupSchema.parse(response.data)
    },
    createGroup: async (request: GroupRequest): Promise<Group> => {
      const response = await post('groups', { group: request })
      return groupSchema.parse(response.data)
    },
    updateGroup: async (id: number, request: GroupRequest) => {
      await patch(`groups/${id}`, { group: request })
    },
    assignSecretSints: async (groupId: number) => {
      await post(`groups/${groupId}/assign_secret_sints`)
    },
    leaveGroup: async (id: number) => {
      await del(`groups/${id}/participations/own`)
    },
    invite: async (groupId: number, request: InviteRequest) => {
      await post(`groups/${groupId}/participations`, { participation: request })
    },
    participation: async (groupId: number): Promise<Participation> => {
      const response = await get(`groups/${groupId}/participations/own`)
      return participationSchema.parse(response.data)
    },
    updateParticipation: async (
      groupId: number,
      request: ParticipationRequest,
    ) => {
      await patch(`groups/${groupId}/participations/own`, {
        participation: request,
      })
    },
    assignee: async (groupId: number) => {
      const response = await get(`groups/${groupId}/participations/assigned`)
      return participationSchema.parse(response.data)
    },
  }
}

const apiMethod =
  (baseUrl: string, method: 'POST' | 'GET' | 'DELETE' | 'PATCH') =>
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
