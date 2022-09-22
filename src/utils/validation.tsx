import { BigNumber, constants, Contract, ethers, Signer } from "ethers"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { notifyDismiss, notifyError, notifyLoading, notifySuccess } from "../hooks/useNotification"
import ERC20 from "@uniswap/v2-core/build/ERC20.json"

function validateNumberStr(numberInputStr: string) {
  let strToSet = ''
  let i = numberInputStr.indexOf('.')

  if (i < 0) { // no decimal
    strToSet = numberInputStr.replace(/[^0-9]/g, '')
  } else if (i == 0) { // decimal first
    strToSet = "0." + numberInputStr.substring(1).replace(/[^0-9]/g, '')
  } else if (i > 0 && i + 1 < numberInputStr.length) { // decimal middle
    strToSet =
      numberInputStr.substring(0, i + 1).replace(/[^0-9\.]/g, '') +
      numberInputStr.substring(i + 1).replace(/[^0-9]/g, '')
  } else { // decimal last
    strToSet = numberInputStr.replace(/[^0-9\.]/g, '')
  }
  return strToSet
}

export function handleNumberInput(
  event: ChangeEvent<HTMLInputElement>,
  setInputStr: Dispatch<SetStateAction<string>>,
) {
  setInputStr(validateNumberStr(event.target.value))
}

export async function ensureAllowance(
  account: string | null,
  erc20Address: string,
  amountBN: BigNumber,
  posMgrAddress: string,
  signer: Signer | undefined
) {
  try {
    let erc20 = new ethers.Contract(erc20Address, ERC20.abi, signer)

    // check enough balance
    let balanceBN = await erc20.balanceOf(account)
    if (balanceBN < amountBN) {
      notifyError(
        'Not enough ' + erc20.symbol + '. Requested: ' + amountBN + 
        ' Balance ' + balanceBN
      )
    }
    // check enough allowance
    let allowance = await erc20.allowance(account, posMgrAddress)
    if (allowance < amountBN) {
      return approve(erc20, posMgrAddress)
    }
  } catch (e) {
    if (typeof e === 'string') {
      notifyError('checkAllowance: ' + e)
    } else if (e instanceof Error) {
      notifyError('checkAllowance: ' + e.message)
    }
  }
}

async function approve(fromTokenContract: Contract, spender: string) {
  let tx = await fromTokenContract.approve(spender, constants.MaxUint256)
  let loading = notifyLoading('Waiting for approval')
  let receipt = await tx.wait()
  notifyDismiss(loading)
  if (receipt.status == 1) {
    notifySuccess('Approval completed')
    return
  }
  notifySuccess('Approval failed')
}
