import { Fragment } from "react"
import Dapp from "./Dapp"
import { TokenContextProvider } from "./context/TokenContext"

const App = () => {
  return (
    <TokenContextProvider>
      <Dapp />
    </TokenContextProvider>
  )
}

export default App
