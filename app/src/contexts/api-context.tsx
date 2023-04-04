import { createContext, ReactNode } from 'react'
import { SignUpRequest } from '../schemata/sign-up-request'
import { LogInRequest } from '../schemata/log-in-request'
import { Group, groupSchema } from '../schemata/group'
import { GroupRequest } from '../schemata/group-request'
import { InviteRequest } from '../schemata/invite-request'
import { Participation, participationSchema } from '../schemata/participation'
import { ParticipationRequest } from '../schemata/participation-request'
import createApi, { Api } from '../api/create-api'
import { useNavigate } from 'react-router-dom'

export const ApiContext = createContext(null as unknown as Api)

export interface ApiContextProviderProps {
  children: ReactNode
  apiBase: string
}

export function ApiContextProvider({
  children,
  apiBase,
}: ApiContextProviderProps) {
  const navigate = useNavigate()
  const onAuthError = () => navigate('/login')
  const api = createApi({ baseUrl: apiBase, onAuthError })

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}
