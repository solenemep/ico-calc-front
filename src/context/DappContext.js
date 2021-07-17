import { useColorModeValue } from "@chakra-ui/react"
import { createContext } from "react"

export const DappContext = createContext()

export const DappContextProvider = ({ children }) => {
  const bgNavFoot = useColorModeValue("cyan.100", "gray.900")
  const hoverNavFoot = {
    textDecoration: "none",
    color: "inherit",
    bg: useColorModeValue("cyan.200", "gray.800"),
  }

  const bgContent = useColorModeValue("cyan.50", "gray.800")
  const colorScheme = "cyan"

  return (
    <DappContext.Provider
      value={{ bgNavFoot, hoverNavFoot, bgContent, colorScheme }}
    >
      {children}
    </DappContext.Provider>
  )
}
