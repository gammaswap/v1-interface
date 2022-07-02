import { ethers } from 'ethers'
import { Provider } from '@ethersproject/providers'
import useNotification from '../hooks/useNotification'
import { AccountInfo } from '../context/WalletContext'
import { Token } from '../components/Tokens'

export type SmartContract = {
    tokenABalance: string
    tokenBBalance: string
}

const getSmartContract = async (
    contractABI: string,
    tokenAAddr: string,
    tokenBAddr: string,
    accountInfo: AccountInfo,
    provider: Provider,
) => {
    const { notifyError, notifySuccess } = useNotification()

    try {
        const tokenAContract = new ethers.Contract(tokenAAddr, contractABI, provider as Provider)
        const tokenBContract = new ethers.Contract(tokenBAddr, contractABI, provider as Provider)

        if (accountInfo) {
            const tokenABalance = await tokenAContract.balanceOf(accountInfo.address)
            const tokenBBalance = await tokenBContract.balanceOf(accountInfo.address)

            const smartContractFuncs = {
                tokenABalance: formatEther(tokenABalance),
                tokenBBalance: formatEther(tokenBBalance),
            }

            return smartContractFuncs
        }
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)

        notifyError(message)
    }

}

const formatEther = (weiNumber: number) => {
    return ethers.utils.formatEther(weiNumber)
}

export default getSmartContract