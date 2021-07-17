import { createContext } from "react"
import { useContract } from "web3-hooks"
import { calculatorAddress, calculatorABI } from "../contracts/Calculator"

export const CalculatorContext = createContext()

export const CalculatorContextProvider = ({ children }) => {
  const calculator = useContract(calculatorAddress, calculatorABI)
  return (
    <CalculatorContext.Provider value={{ calculator }}>
      {children}
    </CalculatorContext.Provider>
  )
}
