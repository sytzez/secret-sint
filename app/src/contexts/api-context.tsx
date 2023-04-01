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
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
  )

  const api: Api = {
    signUp: async (request: SignUpRequest) => {
      const response = await post('signup', { user: request })
        .catch((e) => { throw new Error(e.message) })

      if (! response.success) {
        throw new Error(response.message)
      }
    }
  }

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}
