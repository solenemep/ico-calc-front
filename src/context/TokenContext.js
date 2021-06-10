import { createContext } from "react"
import { TokenAddress, TokenABI } from "../contracts/Token"

export const TokenContext = createContext()

export const TokenContextProvider = ({ children }) => {
  return (
    <TokenContext.Provider value={}>
      {children}
    </TokenContext.Provider>
  )
}