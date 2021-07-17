import { Fragment, useState } from "react"
import { useTokenContext } from "../hook/useTokenContext"

const Token = () => {
  const { token } = useTokenContext()
  const [name, setName] = useState("")
  const handleClick = async () => {
    const nameToken = await token.name()
    setName(nameToken)
  }
  return (
    <Fragment>
      return <button type="button" onClick={handleClick} />
      <p>{name}</p>
    </Fragment>
  )
}
export default Token
