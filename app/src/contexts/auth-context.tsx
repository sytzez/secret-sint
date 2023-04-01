import { createContext, Dispatch, ReactNode, useState } from "react";

export interface AuthState {
  userId: number | null
}

export const AuthContext = createContext<[AuthState, Dispatch<AuthState>]>(null as unknown as [AuthState, Dispatch<AuthState>])

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const localState = localStorage.getItem('auth-state')
  const initialState = localState ? JSON.parse(localState) : { userId: null }

  const authState = useState<AuthState>(initialState as AuthState)

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  )
}
