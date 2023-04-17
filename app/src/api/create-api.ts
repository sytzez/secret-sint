import { Group, groupSchema } from '../schemata/group'
import { Participation, participationSchema } from '../schemata/participation'
import { SignUpRequest } from '../schemata/sign-up-request'
import { LogInRequest } from '../schemata/log-in-request'
import { GroupRequest } from '../schemata/group-request'
import { InviteRequest } from '../schemata/invite-request'
import { ParticipationRequest } from '../schemata/participation-request'
import { apiFetcher } from './api-fetcher'

export type Api = ReturnType<typeof createApi>

export interface ApiParams {
  baseUrl: string
  onAuthError: () => void
}

export default function createApi(apiParams: ApiParams) {
  const fetcher = apiFetcher(apiParams)
  const post = fetcher('POST')
  const patch = fetcher('PATCH')
  const get = fetcher('GET')
  const del = fetcher('DELETE')

  return {
    signUp: async (request: SignUpRequest) => {
      await post('signup', { user: request })
    },
    logIn: async (request: LogInRequest) => {
      await post('login', { user: request })
    },
    logOut: async () => {
      await del('logout')
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
