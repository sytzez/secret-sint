import { createContext, ReactNode, useContext } from "react";
import { AuthContext } from "./auth-context";
import { SignUpRequest } from "../schemata/sign-up-request";

export type Api = {
  signUp: (request: SignUpRequest) => void
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
      },
      body: JSON.stringify(body),
    })
  )

  const api: Api = {
    signUp: async (request: SignUpRequest) => {
      try {
        const response = await post('sign-up', { user: request })
        console.log(response)
      } catch(e) {
        console.error(e)
      }
    }
  }

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}
