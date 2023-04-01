import { createContext, ReactNode, useContext } from "react";
import { AuthContext } from "./auth-context";
import { SignUpRequest } from "../schemata/sign-up-request";
import { LogInRequest } from "../schemata/log-in-request";

export interface Api {
  signUp: (request: SignUpRequest) => void
  logIn: (request: LogInRequest) => void
}

export const ApiContext = createContext(null as unknown as Api)

const API_BASE = 'http://localhost:3000'

export function ApiContextProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useContext(AuthContext)

  const post = (route: string, body: object) => (
    fetch(`${API_BASE}/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
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
        if (! response.success) {
          throw new Error(response.message)
        }
        return response
      })
  )

  const api: Api = {
    signUp: async (request: SignUpRequest) => {
      const response = await post('signup', { user: request })
      setAuthState({ userId: response.data.id })
    },
    logIn: async (request: LogInRequest) => {
      const response = await post('login', { user: request })
      setAuthState({ userId: response.data.id })
    },
  }

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}
