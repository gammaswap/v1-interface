import { BigNumber } from 'ethers'

const ONE = BigNumber.from(1)
const TWO = BigNumber.from(2)

// This function will return a square root for the number provided as a parameter
export const sqrt = (value: number) => {
  let x = BigNumber.from(value)
  let z = x.add(ONE).div(TWO)
  let y = x
  while (z.sub(y).isNegative()) {
    y = z
    z = x.div(z).add(z).div(TWO)
  }
  return y
}
