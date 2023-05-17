import { createContext, useContext } from "react"
import useAuth from "../hooks/useAuth"

const SessionContext = createContext()

export default function SessionProvider({ children }) {
  return (
    <SessionContext.Provider value={useAuth()}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  return useContext(SessionContext)
}
