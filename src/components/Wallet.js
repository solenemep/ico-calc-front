import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
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
import { useTokenContext } from "../hook/useTokenContext"
import { useWeb3 } from "web3-hooks"
import { useDappContext } from "../hook/useDappContext"
import { useEffect, useState } from "react"
import { Fragment } from "react"

const Wallet = () => {
  const [web3State] = useWeb3()
  const { token } = useTokenContext()
  const { colorScheme, hoverNavFoot, bgCalc } = useDappContext()
  const toast = useToast()

  // NAME
  const [name, setName] = useState("")
  // SYMBOL
  const [symbol, setSymbol] = useState("")
  // TOTALSUPPLY
  const [totalSupply, setTotalSupply] = useState("")
  // DECIMALS
  const [decimals, setDecimals] = useState("")

  // GETTER
  useEffect(() => {
    if (token) {
      const getName = async () => {
        try {
          const name = await token.name()
          setName(name)
        } catch (e) {
          console.log(e)
        }
      }

      const getSymbol = async () => {
        try {
          const symbol = await token.symbol()
          setSymbol(symbol)
        } catch (e) {
          console.log(e)
        }
      }

      const getTotalSupply = async () => {
        try {
          const totalSupply = await token.totalSupply()
          setTotalSupply(totalSupply.toString())
        } catch (e) {
          console.log(e)
        }
      }

      const getDecimals = async () => {
        try {
          const decimals = await token.decimals()
          setDecimals(decimals.toString())
        } catch (e) {
          console.log(e)
        }
      }
      getName()
      getSymbol()
      getTotalSupply()
      getDecimals()
    }
  }, [token])

  // BALANCEOF
  const [balanceOf, setBalanceOf] = useState(0)
  const [balanceOfAccount, setBalanceOfAccount] = useState("")
  const [isLoadingBalanceOf, setIsLoadingBalanceOf] = useState(false)
  const handleBalanceOf = async () => {
    try {
      setIsLoadingBalanceOf(true)
      const balanceOf = await token.balanceOf(balanceOfAccount)
      setBalanceOf(balanceOf.toString())
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingBalanceOf(false)
    }
  }

  // ALLOWANCE
  const [allowance, setAllowance] = useState(0)
  const [allowanceOwner, setAllowanceOwner] = useState("")
  const [allowanceSpender, setAllowanceSpender] = useState("")
  const [isLoadingAllowance, setIsLoadingAllowance] = useState(false)
  const handleAllowance = async () => {
    try {
      setIsLoadingAllowance(true)
      const allowance = await token.allowance(allowanceOwner, allowanceSpender)
      setAllowance(allowance.toString())
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoadingAllowance(false)
    }
  }

  // TRANSFER - TRANSFERFROM
  const [transferSender, setTransferSender] = useState("")
  const [transferRecipient, setTransferRecipient] = useState("")
  const [transfertAmount, setTransferAmount] = useState(0)
  const [isLoadingTransfer, setIsLoadingTransfer] = useState(false)
  const [isLoadingTransferFrom, setIsLoadingTransferFrom] = useState(false)
  const handleTransfer = async () => {
    try {
      setIsLoadingTransfer(true)
      let tx = await token.transfer(transferRecipient, transfertAmount)
      await tx.wait()
      toast({
        title: "Transfer successfull",
        description: `Transfer of ${transfertAmount} to ${transferRecipient}`,
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
      setIsLoadingTransfer(false)
    }
  }
  const handleTransferFrom = async () => {
    try {
      setIsLoadingTransferFrom(true)
      let tx = await token.transferFrom(
        transferSender,
        transferRecipient,
        transfertAmount
      )
      await tx.wait()
      toast({
        title: "TransferFrom successfull",
        description: `Transfer of ${transfertAmount} from ${transferSender} to ${transferRecipient}`,
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
      setIsLoadingTransferFrom(false)
    }
  }

  // APPROVE - INCREASEALLOWNANCE - DECREASEALLOWANCE
  const [approveSpender, setApproveSpender] = useState("")
  const [approveAmount, setApproveAmount] = useState(0)
  const [increaseAllowanceValue, setIncreaseAllowanceValue] = useState(0)
  const [decreaseAllowanceValue, setDecreaseAllowanceValue] = useState(0)
  const [isLoadingApprove, setIsLoadingApprove] = useState(false)
  const [isLoadingIncreaseAllowance, setIsLoadingIncreaseAllowance] =
    useState(false)
  const [isLoadingDecreaseAllowance, setIsLoadingDecreaseAllowance] =
    useState(false)
  const handleApprove = async () => {
    try {
      setIsLoadingApprove(true)
      let tx = await token.approve(approveSpender, approveAmount)
      await tx.wait()
      toast({
        title: "Approve successfull",
        description: `Approved ${approveSpender} for ${approveAmount}`,
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
      }
    } finally {
      setIsLoadingApprove(false)
    }
  }
  const handleIncreaseAllowance = async () => {
    try {
      setIsLoadingIncreaseAllowance(true)
      let tx = await token.increaseAllowance(
        approveSpender,
        increaseAllowanceValue
      )
      await tx.wait()
      toast({
        title: "IncreaseAllowance successfull",
        description: `Increase allowance of ${approveSpender} to ${increaseAllowanceValue}`,
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
      setIsLoadingIncreaseAllowance(false)
    }
  }
  const handleDecreaseAllowance = async () => {
    try {
      setIsLoadingDecreaseAllowance(true)
      let tx = await token.decreaseAllowance(
        approveSpender,
        decreaseAllowanceValue
      )
      await tx.wait()
      toast({
        title: "DecreaseAllowance successfull",
        description: `Decrease allowance of ${approveSpender} to ${decreaseAllowanceValue}`,
        variant: "subtle",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      toast({
        title: "Transaction signature denied",
        description: e.message,
        variant: "subtle",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setIsLoadingDecreaseAllowance(false)
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
        Wallet
      </Heading>

      <Text
        my={8}
        width={600}
        textAlign={"center"}
        as={"small"}
        style={{ textTransform: "uppercase" }}
      >
        Use your wallet as classic ERC20.
      </Text>

      {web3State.isLogged && web3State.chainId === 42 ? (
        <Fragment>
          <HStack alignItems={"center"} my={8} spacing={4}>
            <VStack>
              <Badge colorScheme={colorScheme}>Name : {name}</Badge>
              <Badge colorScheme={colorScheme}>Symbol : {symbol}</Badge>
            </VStack>
            <VStack>
              <Badge colorScheme={colorScheme}>Decimals = {decimals}</Badge>
              <Badge colorScheme={colorScheme}>
                Total Supply : {totalSupply}
              </Badge>
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
              <Tab>Balance</Tab>
              <Tab>Allowance</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Input
                  bgColor="white"
                  color="black"
                  mb={4}
                  placeholder="address"
                  _placeholder={{ color: "gray.400" }}
                  value={balanceOfAccount}
                  onChange={(e) => setBalanceOfAccount(e.target.value)}
                />

                <Button
                  _hover={hoverNavFoot}
                  bg={bgCalc}
                  mb={4}
                  px={4}
                  py={2}
                  width={"100%"}
                  size={"md"}
                  type="button"
                  aria-label="balanceOf"
                  onClick={handleBalanceOf}
                  isLoading={isLoadingBalanceOf}
                >
                  balanceOf
                </Button>
                <Text mb={4} style={{ fontWeight: "bold" }} color="black">
                  {balanceOf === 0
                    ? "Balance is null"
                    : `Balance is ${balanceOf}`}
                </Text>
              </TabPanel>
              <TabPanel>
                <Input
                  bgColor="white"
                  color="black"
                  mb={4}
                  placeholder="owner address"
                  _placeholder={{ color: "gray.400" }}
                  value={allowanceOwner}
                  onChange={(e) => setAllowanceOwner(e.target.value)}
                />

                <Input
                  bgColor="white"
                  color="black"
                  mb={4}
                  placeholder="spender address"
                  _placeholder={{ color: "gray.400" }}
                  value={allowanceSpender}
                  onChange={(e) => setAllowanceSpender(e.target.value)}
                />

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
                  onClick={handleAllowance}
                  isLoading={isLoadingAllowance}
                >
                  allowance
                </Button>
                <Text mb={4} style={{ fontWeight: "bold" }} color="black">
                  {allowance === 0
                    ? "Not allowed"
                    : `Allowance is ${allowance}`}
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
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
              <Tab>Transfer</Tab>
              <Tab>Approve</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Input
                  bgColor="white"
                  color="black"
                  mb={4}
                  placeholder="sender address"
                  _placeholder={{ color: "gray.400" }}
                  value={transferSender}
                  onChange={(e) => setTransferSender(e.target.value)}
                />

                <Input
                  bgColor="white"
                  color="black"
                  mb={4}
                  placeholder="recipient address"
                  _placeholder={{ color: "gray.400" }}
                  value={transferRecipient}
                  onChange={(e) => setTransferRecipient(e.target.value)}
                />

                <Input
                  bgColor="white"
                  color="black"
                  mb={4}
                  placeholder="amount"
                  _placeholder={{ color: "gray.400" }}
                  value={transfertAmount === 0 ? "" : transfertAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />

                <HStack spacing={4} mb={4}>
                  <Button
                    _hover={hoverNavFoot}
                    bg={bgCalc}
                    onClick={handleTransfer}
                    isLoading={isLoadingTransfer}
                    px={4}
                    py={2}
                    width={"100%"}
                    size={"md"}
                    type="button"
                    aria-label="transfer"
                  >
                    transfer
                  </Button>
                  <Button
                    _hover={hoverNavFoot}
                    bg={bgCalc}
                    px={4}
                    py={2}
                    width={"100%"}
                    size={"md"}
                    type="button"
                    aria-label="transferFrom"
                    onClick={handleTransferFrom}
                    isLoading={isLoadingTransferFrom}
                  >
                    transferFrom
                  </Button>
                </HStack>
              </TabPanel>
              <TabPanel>
                <Input
                  bgColor="white"
                  color="black"
                  mb={4}
                  placeholder="spender address"
                  _placeholder={{ color: "gray.400" }}
                  value={approveSpender}
                  onChange={(e) => setApproveSpender(e.target.value)}
                />

                <HStack spacing={4} mb={4}>
                  <Input
                    bgColor="white"
                    color="black"
                    width={"100%"}
                    placeholder="amount"
                    _placeholder={{ color: "gray.400" }}
                    value={approveAmount === 0 ? "" : approveAmount}
                    onChange={(e) => setApproveAmount(e.target.value)}
                  />

                  <Input
                    bgColor="white"
                    color="black"
                    width={"100%"}
                    placeholder="added value"
                    _placeholder={{ color: "gray.400" }}
                    value={
                      increaseAllowanceValue === 0 ? "" : increaseAllowanceValue
                    }
                    onChange={(e) => setIncreaseAllowanceValue(e.target.value)}
                  />

                  <Input
                    bgColor="white"
                    color="black"
                    width={"100%"}
                    placeholder="substracted value"
                    _placeholder={{ color: "gray.400" }}
                    value={
                      decreaseAllowanceValue === 0 ? "" : decreaseAllowanceValue
                    }
                    onChange={(e) => setDecreaseAllowanceValue(e.target.value)}
                  />
                </HStack>
                <HStack spacing={4} mb={4}>
                  <Button
                    _hover={hoverNavFoot}
                    bg={bgCalc}
                    width={"100%"}
                    px={4}
                    py={2}
                    size={"md"}
                    type="button"
                    aria-label="approve"
                    onClick={handleApprove}
                    isLoading={isLoadingApprove}
                  >
                    approve
                  </Button>

                  <Button
                    _hover={hoverNavFoot}
                    bg={bgCalc}
                    width={"100%"}
                    px={4}
                    py={2}
                    size={"md"}
                    type="button"
                    aria-label="increaseAllowance"
                    onClick={handleIncreaseAllowance}
                    isLoading={isLoadingIncreaseAllowance}
                  >
                    increaseAllowance
                  </Button>

                  <Button
                    _hover={hoverNavFoot}
                    bg={bgCalc}
                    width={"100%"}
                    px={4}
                    py={2}
                    size={"md"}
                    type="button"
                    aria-label="decreaseAllowance"
                    onClick={handleDecreaseAllowance}
                    isLoading={isLoadingDecreaseAllowance}
                  >
                    decreaseAllowance
                  </Button>
                </HStack>
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
export default Wallet
