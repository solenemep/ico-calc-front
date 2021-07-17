import { useContext } from "react"
import { ICOContext } from "../context/ICOContext"

export const useICOContext = () => {
  const context = useContext(ICOContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use ICOContext outside of its provider`
    )
  }
  return context
}
