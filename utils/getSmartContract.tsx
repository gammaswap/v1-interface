import { ethers } from 'ethers'
import { Provider } from '@ethersproject/providers'
import useNotification from '../hooks/useNotification'
import { AccountInfo } from '../context/WalletContext'

const getSmartContract = async (
    contractABI: string,
    tokenAAddr: string,
    tokenBAddr: string,
    accountInfo: AccountInfo,
    provider: Provider,
) => {
    const { notifyError, notifySuccess } = useNotification()

    if (!tokenBAddr) return null

    try {
        const tokenAContract = new ethers.Contract(tokenAAddr, contractABI, provider as Provider)
        const tokenBContract = new ethers.Contract(tokenBAddr, contractABI, provider as Provider)

        if (accountInfo) {
            const tokenABalance = await tokenAContract.balanceOf(accountInfo.address)
            const tokenBBalance = await tokenBContract.balanceOf(accountInfo.address)
            console.log('tokenABalance: ', ethers.utils.formatEther(tokenABalance));
            console.log('tokenBBalance: ', ethers.utils.formatEther(tokenBBalance));

        }

    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)

        notifyError(message)
    }

}

export default getSmartContract