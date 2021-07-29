import { useColorModeValue } from "@chakra-ui/react"
import { createContext } from "react"

export const DappContext = createContext()

export const DappContextProvider = ({ children }) => {
  const bgNavFoot = useColorModeValue("cyan.100", "gray.900")
  const hoverNavFoot = {
    textDecoration: "none",
    color: "inherit",
    backgroungColor: "inherit",
  }

  const bgContent = useColorModeValue("cyan.50", "gray.800")
  const colorScheme = "cyan"

  const bgCalc = useColorModeValue("gray.100", "gray.700")

  return (
    <DappContext.Provider
      value={{ bgNavFoot, hoverNavFoot, bgContent, colorScheme, bgCalc }}
    >
      {children}
    </DappContext.Provider>
  )
}
