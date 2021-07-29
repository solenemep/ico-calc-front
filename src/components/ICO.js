import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { Fragment, useEffect, useState } from "react"
import { useWeb3 } from "web3-hooks"
import { useDappContext } from "../hook/useDappContext"
import { useICOContext } from "../hook/useICOContext"

const ICO = () => {
  const [web3State] = useWeb3()
  const { bgCalc, colorScheme, hoverNavFoot } = useDappContext()
  const toast = useToast()
  const { ico } = useICOContext()

  // NAME
  const [price, setPrice] = useState(0)
  // SYMBOL
  const [nb, setNb] = useState(0)
  // TOTALSUPPLY
  const [gain, setGain] = useState(0)

  // GETTER
  useEffect(() => {
    if (ico) {
      const getPrice = async () => {
        try {
          const price = await ico.tokenPrice()
          setPrice(price.toString())
        } catch (e) {
          console.log(e)
        }
      }

      const getNb = async () => {
        try {
          const nb = await ico.nbTokenSold()
          setNb(nb.toString())
        } catch (e) {
          console.log(e)
        }
      }

      const getGain = async () => {
        try {
          const gain = await ico.gain()
          setGain(gain.toString())
        } catch (e) {
          console.log(e)
        }
      }

      getPrice()
      getNb()
      getGain()
    }
  }, [ico])

  // BUY
  const [amount, setAmount] = useState(0)
  const [isLoadingBuy, setIsLoadingBuy] = useState(false)
  const handleBuyClick = async () => {
    try {
      setIsLoadingBuy(true)
      let tx = await ico.buyTokens({
        value: amount,
      })
      await tx.wait()
      toast({
        title: "Purchase sucessfull",
        description: `You purchased ${amount} TKN`,
        variant: "subtle",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
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
      } else {
        toast({
          title: "Transaction signature denied",
          description: "KO",
          variant: "subtle",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    } finally {
      setAmount(0)
      setIsLoadingBuy(false)
    }
  }

  // WITHDRAW
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false)
  const handleWithdrawClick = async () => {
    try {
      setIsLoadingWithdraw(true)
      let tx = await ico.withdraw()
      await tx.wait()
      toast({
        title: "Withdraw sucessfull",
        description: `You sold all your TKN`,
        variant: "subtle",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
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
    } finally {
      setIsLoadingWithdraw(false)
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
        ICO
      </Heading>
      <Text
        my={8}
        width={600}
        textAlign={"center"}
        as={"small"}
        style={{ textTransform: "uppercase" }}
      >
        Here you can buy some TKN with ETH.
      </Text>
      {web3State.isLogged && web3State.chainId === 42 ? (
        <Fragment>
          <HStack alignItems={"center"} my={8} spacing={4}>
            <VStack>
              <Badge colorScheme={colorScheme}>TKN price : {price}</Badge>
              <Badge colorScheme={colorScheme}>nb TKN sold : {nb}</Badge>
              <Badge colorScheme={colorScheme}>gain : {gain}</Badge>
            </VStack>
          </HStack>

          <Tabs
            my={8}
            backgroundColor="cyan.100"
            rounded={"md"}
            p={4}
            variant="soft-rounded"
            colorScheme={colorScheme}
            width={"100%"}
            isFitted
          >
            <TabList>
              <Tab>Buy</Tab>
              <Tab>Withdraw</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <InputGroup>
                  <Input
                    bgColor="white"
                    color="black"
                    mb={4}
                    placeholder="amount"
                    _placeholder={{ color: "gray.400" }}
                    value={amount === 0 ? "" : `${amount}`}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <InputRightAddon bg={bgCalc} children="ETH" />
                </InputGroup>

                <Button
                  _hover={hoverNavFoot}
                  bg={bgCalc}
                  mb={4}
                  px={4}
                  py={2}
                  width={"100%"}
                  size={"md"}
                  type="button"
                  aria-label="buy"
                  onClick={handleBuyClick}
                  isLoading={isLoadingBuy}
                >
                  Buy
                </Button>
              </TabPanel>
              <TabPanel>
                <Button
                  _hover={hoverNavFoot}
                  bg={bgCalc}
                  mb={4}
                  px={4}
                  py={2}
                  width={"100%"}
                  size={"md"}
                  type="button"
                  aria-label="allowance"
                  onClick={handleWithdrawClick}
                  isLoading={isLoadingWithdraw}
                >
                  Withdraw
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Fragment>
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
export default ICO
