import {BigNumber, ethers} from 'ethers'

// This function will return a square root for the number provided as a parameter
export function sqrt(y: any) {
  let z
  if (y.gt(3)) {
    z = y
    let x = y.div(2).add(1)
    while (x.lt(z)) {
      z = x
      x = y.div(x).add(x).div(2)
    }
  } else if (!y.isZero()) {
    z = BigNumber.from(1)
  }
  return z
}

// This function will return an ether value for a wei value provided as a parameter. match will convert the value to two decimal points without rounding the value to nearest big integer
export function weiToEther(num: number) {
  return ethers.utils
    .formatEther(num.toString())
    .toString()
    ?.match(/^-?\d+(?:\.\d{0,2})?/)![0]
}
