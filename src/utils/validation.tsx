import { BigNumber, constants, Contract, ethers, Signer } from 'ethers'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { notifyDismiss, notifyError, notifyLoading, notifySuccess } from '../hooks/useNotification'
import ERC20 from '@uniswap/v2-core/build/ERC20.json'

function validateNumberStr(numberInputStr: string) {
  let strToSet = ''
  let i = numberInputStr.indexOf('.')

  if (i < 0) {
    // no decimal
    strToSet = numberInputStr.replace(/[^0-9]/g, '')
  } else if (i == 0) {
    // decimal first
    strToSet = '0.' + numberInputStr.substring(1).replace(/[^0-9]/g, '')
  } else if (i > 0 && i + 1 < numberInputStr.length) {
    // decimal middle
    strToSet =
      numberInputStr.substring(0, i + 1).replace(/[^0-9\.]/g, '') +
      numberInputStr.substring(i + 1).replace(/[^0-9]/g, '')
  } else {
    // decimal last
    strToSet = numberInputStr.replace(/[^0-9\.]/g, '')
  }
  return strToSet
}

export function handleNumberInput(event: ChangeEvent<HTMLInputElement>, setInputStr: Dispatch<SetStateAction<string>>) {
  setInputStr(validateNumberStr(event.target.value))
}

export const validateAllowance = async (
  accountAddress: string,
  erc20: Contract,
  amountBN: BigNumber,
  spenderContract: string
) => {
  let loading = notifyLoading('Checking allowance')
  try {
    let amountStr = ethers.utils.formatUnits(amountBN, 18)
    let balanceBN = await erc20.balanceOf(accountAddress)
    if (balanceBN < amountBN) {
      notifyDismiss(loading)
      notifyError('Not enough funds. Requested: ' + amountStr + ' Balance ' + ethers.utils.formatUnits(balanceBN, 18))
      return
    }

    let allowance = await erc20.allowance(accountAddress, spenderContract)
    notifyDismiss(loading)
    if (allowance < amountBN) {
      return await doApprove(erc20, spenderContract)
    } else {
      return true
    }
  } catch (err) {
    console.log(err)
    notifyDismiss(loading)
    notifyError('An error occurred while processing allowance')
    return
  }
}

export const doApprove = async (erc20: Contract, spender: string) => {
  let loadingApproval = notifyLoading('Waiting for approval')
  try {
    let tx = await erc20.approve(spender, constants.MaxUint256)
    let receipt = await tx.wait()
    notifyDismiss(loadingApproval)
    if (receipt.status == 1) {
      notifySuccess('Approval completed')
      return true
    }
    notifyError('Approval failed')
    return false
  } catch (err: any) {
    notifyDismiss(loadingApproval)
    if (err?.code === 'ACTION_REJECTED') {
      notifyError('User rejected the transaction')
    } else {
      notifyError('An error occurred while processing the approval request. Please try again')
    }
    return false
  }
}
