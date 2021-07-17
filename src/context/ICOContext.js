import { createContext } from "react"
import { useContract } from "web3-hooks"
import { ICOAddress, ICOABI } from "../contracts/ICO"

export const ICOContext = createContext()

export const ICOContextProvider = ({ children }) => {
  const ico = useContract(ICOAddress, ICOABI)
  return <ICOContext.Provider value={{ ico }}>{children}</ICOContext.Provider>
}
