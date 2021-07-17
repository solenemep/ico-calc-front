import { useContext } from "react"
import { CalculatorContext } from "../context/CalculatorContext"

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use CalculatorContext outside of its provider`
    )
  }
  return context
}
