import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  VStack,
  Link,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useWeb3 } from "web3-hooks"
import { useCalculatorContext } from "../hook/useCalculatorContext"
import { useDappContext } from "../hook/useDappContext"

const Calculator = () => {
  const [web3State] = useWeb3()
  const { calculator } = useCalculatorContext()
  const { bgCalc, hoverNavFoot } = useDappContext()
  const [expression, setExpression] = useState("")
  const [nb1, setNb1] = useState(0)
  const [nb2, setNb2] = useState(0)
  const [op, setOp] = useState("")
  const [result, setResult] = useState("")
  const toast = useToast()

  useEffect(() => {
    const tab1 = expression.split("")
    tab1.forEach((el) => {
      if (el === "+" || el === "-" || el === "x" || el === "÷" || el === "%") {
        setOp(el)
      }
    })
    const tab2 = expression.split(op)
    setNb1(Number(tab2[0]))
    setNb2(Number(tab2[1]))
  }, [op, expression])

  const handleClick = async () => {
    switch (op) {
      case "+":
        try {
          const res = await calculator.add(nb1, nb2)
          setResult(res.toString())
        } catch (e) {
          console.log(e)
          if (e.code === 4001) {
            toast({
              title: "Transaction signature denied",
              description: e.message,
              variant: "subtle",
              status: "error",
              duration: 9000,
              isClosable: true,
            })
          }
        }
        break
      case "-":
        try {
          const res = await calculator.sub(nb1, nb2)
          setResult(res.toString())
        } catch (e) {
          if (e.code === 4001) {
            toast({
              title: "Transaction signature denied",
              description: e.message,
              variant: "subtle",
              status: "error",
              duration: 9000,
              isClosable: true,
            })
          }
        }
        break
      case "x":
        try {
          const res = await calculator.mul(nb1, nb2)
          setResult(res.toString())
        } catch (e) {
          if (e.code === 4001) {
            toast({
              title: "Transaction signature denied",
              description: e.message,
              variant: "subtle",
              status: "error",
              duration: 9000,
              isClosable: true,
            })
          }
        }
        break
      case "÷":
        try {
          if (nb2 === 0) {
            setResult("DIV BY 0")
          } else {
            const res = await calculator.div(nb1, nb2)
            setResult(res.toString())
          }
        } catch (e) {
          if (e.code === 4001) {
            toast({
              title: "Transaction signature denied",
              description: e.message,
              variant: "subtle",
              status: "error",
              duration: 9000,
              isClosable: true,
            })
          }
        }
        break
      case "%":
        try {
          const res = await calculator.mod(nb1, nb2)
          setResult(res.toString())
        } catch (e) {
          if (e.code === 4001) {
            toast({
              title: "Transaction signature denied",
              description: e.message,
              variant: "subtle",
              status: "error",
              duration: 9000,
              isClosable: true,
            })
          }
        }
        break
      default:
        break
    }
  }

  return (
    <Flex
      spacing={16}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
      mx={16}
      py={16}
    >
      <Heading as={"h2"} size="2xl" my={8}>
        Calculator
      </Heading>
      <Text
        my={8}
        width={600}
        textAlign={"center"}
        as={"small"}
        style={{ textTransform: "uppercase" }}
      >
        Here you can use the calculator, each calcul is payable with TKN.
      </Text>
      {web3State.isLogged && web3State.chainId === 42 ? (
        <Flex my={5} direction="column" align="center" justify="center">
          <Grid
            height="300px"
            shadow="xs"
            rounded="lg"
            backgroundColor="cyan.100"
            padding={4}
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={4}
          >
            <GridItem
              bgColor="white"
              color="black"
              rounded="lg"
              rowSpan={1}
              colSpan={3}
              padding={2}
            >
              <Input
                variant="unstyled"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
              ></Input>
            </GridItem>
            <GridItem
              bgColor="white"
              color="black"
              rounded="lg"
              rowSpan={1}
              colSpan={3}
              padding={2}
            >
              {result}
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="reset"
                onClick={(e) => setExpression("")}
              >
                Reset
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="1"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                1
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="2"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                2
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="3"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                3
              </Button>
            </GridItem>

            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                height="100%"
                width="100%"
                bgColor="gray.300"
                type="button"
                value="+"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                +
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                height="100%"
                width="100%"
                bgColor="gray.300"
                type="button"
                value="-"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                -
              </Button>
            </GridItem>
            <GridItem rowSpan={2} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="0"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                0
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="4"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                4
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="5"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                5
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="6"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                6
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                height="100%"
                width="100%"
                bgColor="gray.300"
                type="button"
                value="x"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                x
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                height="100%"
                width="100%"
                bgColor="gray.300"
                type="button"
                value="÷"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                ÷
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="7"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                7
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="8"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                8
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                bg={bgCalc}
                height="100%"
                width="100%"
                type="button"
                value="9"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                9
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                height="100%"
                width="100%"
                bgColor="gray.300"
                type="button"
                value="%"
                onClick={(e) => setExpression(expression + e.target.value)}
              >
                %
              </Button>
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <Button
                _hover={hoverNavFoot}
                height="100%"
                width="100%"
                bgColor="gray.400"
                type="button"
                value="="
                onClick={handleClick}
              >
                =
              </Button>
            </GridItem>
          </Grid>
          <Button m={6}>Withdraw</Button>
        </Flex>
      ) : (
        <VStack my={8}>
          <Link
            style={{ fontWeight: "bold" }}
            href="/"
            aria-label={"Faucet page"}
            px={4}
            py={2}
            rounded={"md"}
            _hover={hoverNavFoot}
          >
            Back Home to check connection
          </Link>
        </VStack>
      )}
    </Flex>
  )
}
export default Calculator
