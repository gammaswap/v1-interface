import { ethers } from 'ethers'
import { EtherscanProvider, Provider } from '@ethersproject/providers'
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

    try {
        if (!tokenBAddr) return null

        const tokenAContract = new ethers.Contract(tokenAAddr, contractABI, provider as Provider)
        const tokenBContract = new ethers.Contract(tokenBAddr, contractABI, provider as Provider)

        if (accountInfo) {
            const tokenABalance = await tokenAContract.balanceOf(accountInfo.address)

            console.log('tokenABalance: ', tokenABalance);
            // const tokenBBalance = await tokenBContract.balanceOf(accountInfo.address)
            // console.log('tokenBBalance: ', tokenBBalance);
        }

        notifySuccess("WE MADE IT!")

    } catch (err) {
        notifyError("Could not get token A or B balances!")
    }

}

export default getSmartContract