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
      credentials: 'include',
    })
      .then((response) => response.json())
      .catch((e) => {
        console.error(e)
        throw new Error('Something went wrong, try again later')
      })
  )

  const api: Api = {
    signUp: async (request: SignUpRequest) => {
      const response = await post('signup', { user: request })

      if (! response.success) {
        throw new Error(response.message)
      }

      setAuthState({ userId: response.data.id })
    }
  }

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  )
}
