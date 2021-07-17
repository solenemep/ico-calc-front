import Dapp from "./Dapp"
import { TokenContextProvider } from "./context/TokenContext"
import { DappContextProvider } from "./context/DappContext"

const App = () => {
  return (
    <TokenContextProvider>
      <DappContextProvider>
        <Dapp />
      </DappContextProvider>
    </TokenContextProvider>
  )
}

export default App
