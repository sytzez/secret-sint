import { createContext, ReactNode } from 'react'
import { SignUpRequest } from '../schemata/sign-up-request'
import { LogInRequest } from '../schemata/log-in-request'
import { Group, groupSchema } from '../schemata/group'
import { GroupRequest } from '../schemata/group-request'
import { InviteRequest } from '../schemata/invite-request'
import { Participation, participationSchema } from '../schemata/participation'
import { ParticipationRequest } from '../schemata/participation-request'
import createApi, { Api } from '../api/create-api'

export const ApiContext = createContext(null as unknown as Api)

const API_BASE = 'http://127.0.0.1:3000'

export function ApiContextProvider({ children }: { children: ReactNode }) {
  const api = createApi(API_BASE)

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
