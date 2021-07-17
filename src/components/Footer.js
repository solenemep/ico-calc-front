import { Box, Flex, Badge, VStack } from "@chakra-ui/react"
import { useDappContext } from "../hook/useDappContext"
import { ICOAddress } from "../contracts/ICO"
import { calculatorAddress } from "../contracts/Calculator"
import { tokenAddress } from "../contracts/Token"

const Footer = () => {
  const { bgNavFoot, colorScheme } = useDappContext()

  return (
    <Box bg={bgNavFoot} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <VStack alignItems={"start"} my={8}>
          <Badge colorScheme={colorScheme}>Deployed on Kovan</Badge>
          <Badge colorScheme={colorScheme}>Token {tokenAddress}</Badge>
        </VStack>
        <VStack alignItems={"start"} my={8}>
          <Badge colorScheme={colorScheme}>ICO {ICOAddress}</Badge>
          <Badge colorScheme={colorScheme}>
            Calculator {calculatorAddress}
          </Badge>
        </VStack>
      </Flex>
    </Box>
  )
}
export default Footer
