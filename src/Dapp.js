import { Box } from "@chakra-ui/react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Calculator from "./components/Calculator"
import ICO from "./components/ICO"
import Nav from "./components/Nav"
import Home from "./components/Home"
import Footer from "./components/Footer"
import { useDappContext } from "./hook/useDappContext"
import { ICOContextProvider } from "./context/ICOContext"
import { CalculatorContextProvider } from "./context/CalculatorContext"

const Dapp = () => {
  const { bgContent } = useDappContext()
  return (
    <Router>
      <Nav />
      <Box bg={bgContent} minH={"100vh"}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/calculator">
            <ICOContextProvider>
              <ICO />
            </ICOContextProvider>
          </Route>
          <Route exact path="/calculator">
            <CalculatorContextProvider>
              <Calculator />
            </CalculatorContextProvider>
          </Route>
        </Switch>
      </Box>
      <Footer />
    </Router>
  )
}
export default Dapp
