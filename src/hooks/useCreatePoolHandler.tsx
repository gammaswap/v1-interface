import { useContext, useEffect, useState } from 'react'
import { ethers, Contract } from 'ethers'
import { WalletContext } from '../../src/context/WalletContext'
import GammaPoolFactory from '../../abis/v1-core/GammaPoolFactory.sol/GammaPoolFactory.json'
import { calcPoolKey } from '../../src/utils/getSmartContract'
import Protocols, { Protocol } from '../components/Protocols'
import {notifySuccess, notifyError} from '../../src/hooks/useNotification'

export const useCreatePoolHandler = () => {
  const [gammaPoolFactory, setGammaPoolFactory] = useState<Contract | null>(null)
  const [token1Addr, setToken1Addr] = useState<string>('')
  const [token2Addr, setToken2Addr] = useState<string>('')
  const [cfmmAddr, setCfmmAddr] = useState<string>('')
  const [protocol, setProtocol] = useState<Protocol>(Protocols[0])

  const { accountInfo, provider, signer } = useContext(WalletContext)
  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        console.log('Please connect wallet.')
        return
      }

      let gammaFactoryaddr = process.env.NEXT_PUBLIC_GAMMAFACTORY_ADDR || ''
      let _gammaPoolFactory = new ethers.Contract(
        gammaFactoryaddr,
        GammaPoolFactory.abi,
        accountInfo && accountInfo?.address ? signer : provider
      )

      if (_gammaPoolFactory) {
        setGammaPoolFactory(_gammaPoolFactory)
      }
    }
    fetchContract()
  }, [provider])

  const createPool = async () => {
    try {
      if (!accountInfo || !gammaPoolFactory) {
        notifyError("Please connect your wallet.")
        return
      }

      // check if pool already exists
      let pool = await gammaPoolFactory.getPool(calcPoolKey(cfmmAddr, protocol.id))
      if (pool != ethers.constants.AddressZero) {
        notifyError("Pool already exsts at " + pool)
        return
      }

      let CreatePoolParams = {
        cfmm: cfmmAddr,
        tokens: [token1Addr, token2Addr],
        protocol: protocol.id,
      }
      let tx = await gammaPoolFactory.createPool(CreatePoolParams)
      let res = await tx.wait()
      let poolAddress = res.events[0].address
      let msg = 'Pool created successfully at address: ' + poolAddress
      notifySuccess(msg)
      console.log(msg)
      resetParameters()
    } catch (e) {
      let errorMsg = "Pool not created: "
      if (typeof e === 'string') {
        notifyError(errorMsg + e)
      } else if (e instanceof Error) {
        notifyError(errorMsg + e.message)
      }
    }
  }

  function resetParameters() {
    setToken1Addr('')
    setToken2Addr('')
    setCfmmAddr('')
  }

  return {
    createPool,
    token1Addr,
    setToken1Addr,
    token2Addr,
    setToken2Addr,
    cfmmAddr,
    setCfmmAddr,
    protocol,
    setProtocol
  }
}
