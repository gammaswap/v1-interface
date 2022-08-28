import { useContext, useEffect, useState } from 'react'
import { ethers, Contract } from 'ethers'

import { WalletContext } from '../../src/context/WalletContext'
import { Provider } from '@ethersproject/providers'
import GammaPoolFactory from '../../abis/v1-core/GammaPoolFactory.sol/GammaPoolFactory.json'
import GammaPool from '../../abis/v1-core/GammaPool.sol/GammaPool.json'

export const useCreatePoolHandler = () => {

  const [gammaPoolFactory, setGammaPoolFactory] = useState<Contract | null>(null)
  const [gammaPool, setGammaPool] = useState<Contract | null>(null)

  const { accountInfo, provider, signer } = useContext(WalletContext)
  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        console.log('Please connect wallet.')
        return
      }

      // Position Manager contract address
      let address = process.env.NEXT_PUBLIC_GAMMAPOOL_ADDRESS || ''

      // Variable to hold Position Manager contract
      let _gammaPoolFactory = null
      let _gammaPool = null

      _gammaPoolFactory = new ethers.Contract(
        address,
        GammaPoolFactory.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )

      _gammaPool = new ethers.Contract(
        '0xF058A56adb2d25aeE2600F7334EA6EACA5eFab11',
        GammaPool.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )

      if (_gammaPoolFactory) {
        setGammaPoolFactory(_gammaPoolFactory)
      }

      if(_gammaPool) {
        setGammaPool(_gammaPool)
      }
    }
    fetchContract()
  }, [provider])

  const createPool = async () => {
    console.log('here')
    console.log('Gamma', gammaPoolFactory)
    console.log(accountInfo)
    console.log('Gamma Pool', gammaPool)
    if (gammaPoolFactory && accountInfo) {
      try {
        const CreatePoolParams = {
          cfmm: process.env.NEXT_PUBLIC_CFMM_ADDRESS,
          tokens: [],
          protocol: 1,
        }
        console.log(gammaPoolFactory)
        getPool(process.env.NEXT_PUBLIC_CFMM_ADDRESS || '').then(
          (res) => {
            console.log('res', res)
          }
        ).catch(
          (err) => {console.log(err)}
        )
        let tx = await gammaPoolFactory.createPool(CreatePoolParams)
        let res = await tx.wait()
        const { args } = res.events[0]
        console.log(args.pool)
        console.log(args.reservesLen.toNumber())
        console.log(args.shares.toNumber())
      } catch (e) {
        console.log(e)
        return e
      }
    }
  }

  const getPool = async (cfmm: string) => {
    let key = ethers.utils.solidityKeccak256(['string'], [cfmm])
    console.log('key', key)
    let key32 = ethers.utils.formatBytes32String(key)
    console.log('key 32', key32)
    console.log('getPool')
    if(gammaPoolFactory) {
      let res = await gammaPoolFactory.getPool(key)
      return await res.wait()
    }
  }

  return {
    createPool
  }
}
