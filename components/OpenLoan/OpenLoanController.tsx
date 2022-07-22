import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import Tokens, { Token } from '../Tokens'
import { WalletContext } from '../../context/WalletContext'
// import Factory from '../../abis/Factory.json'
import PositionMgr from '../../abis/PositionManager.json'
import IUniswapV2Pair from '../../abis/IUniswapV2Pair.json'
import IERC20 from '../../abis/ERC20.json'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import { FieldValues } from 'react-hook-form'
import OpenLoanView from './OpenLoanView'

const OpenLoanController = () => {
    const { provider, accountInfo } = useContext(WalletContext)
    const [token0, setToken0] = useState<Token>(Tokens[0])
    const [token1, setToken1] = useState<Token>({
        imgPath: "",
        symbol: "",
        address: "",
    })
    const [posManager, setPosManager] = useState<Contract | null>(null)
    const [posId, setPosId] = useState("")
    const [pos, setPos] = useState({})
    const [uniPrice, setUniPrice] = useState<string>("0")
    const [balInTokB, setBalInTokB] = useState<string>("0")

    useEffect(() => {
        if (!provider) {
            console.log("Please connect wallet.")
            return
        }
        
        var signer = provider.getSigner()
        console.log("provider set and seen in openloan:", provider, accountInfo?.address)
        console.log("signer set and seen in openloan:", signer, accountInfo?.address)
    }, [provider])
    
    useEffect(() => {
        async function fetchData() {
            console.log("Borrow.fetchData() >>")
            console.log(posManager)
            if (!posManager) {
                return
            }

            const positionCount = await posManager.positionCountByOwner(accountInfo?.address)
            console.log("positionCount >>")
            console.log(positionCount)
            console.log(posManager)
            const positions = await posManager.getPositionsByOwner(accountInfo?.address)
            console.log("positions >>")
            console.log(positions)
            if(positionCount <= 0) {
                return
            }
            
            const position = await posManager.positions(positionCount)
            console.log("position() >>")
            console.log(position)
            setPos(position)
            setPosId(positionCount.toString())
            const uniPair = position.uniPair
            console.log("uniPair >> ")
            console.log(uniPair)
            if (!provider) {
                return
            }

            const uniPairContract = new ethers.Contract(uniPair, IUniswapV2Pair.abi, provider)
            const reserves = await uniPairContract.getReserves()
            console.log("reserves >>")
            console.log(reserves.reserve0)
            console.log(reserves.reserve1)
            const price = BigNumber.from(reserves.reserve1).mul(BigNumber.from(10).pow(18)).div(reserves.reserve0)
            console.log("Borrow.price >>")
            console.log(price.toString())
            setUniPrice(price.toString())
            const _uniPrice = BigNumber.from(price.toString())

            if(_uniPrice.lte(constants.Zero)){
                return
            }
            console.log('set balance in tokB')
            const ONE = BigNumber.from(10).pow(18)
            console.log("herer xxx0")
            const squarePrice = sqrt(_uniPrice.mul(ONE))
            console.log("herer xxx1")
            const squarePrice2 = BigNumber.from(squarePrice.toString())
            console.log("herer xxx2")
            const posLiquidity = BigNumber.from(position.liquidity.toString())
            const bal = (squarePrice2.mul(posLiquidity).div(ONE)).mul(2)
            console.log("herer xxx3")
            console.log("bal >> " + bal.toString())
            setBalInTokB(ethers.utils.formatEther(bal))
            console.log("herer xxx4")
        }
        fetchData()
    }, [posManager])

    function sqrt(y: any){
        let z
        if (y.gt(3)) {
            z = y
            let x = (y.div(2)).add(1)
            while (x.lt(z)) {
                z = x
                x = ((y.div(x)).add(x)).div(2)
            }
        } else if (!y.isZero()) {
            z = BigNumber.from(1)
        }
        return z
    }

    async function openLoanHandler(data: FieldValues) {
        if (!accountInfo || !accountInfo.address) {
            console.log("Wallet not connected.")
            return
        }

        lookupPairAddress()

        if (!posManager) {
            console.log("Position manager not found.")
            return
        }

        // unpack
        console.log(token0, token1, data)
        var collateralAmt0 = data.collateralAmt0 ? data.collateralAmt0 : 0
        var collateralAmt1 = data.collateralAmt1 ? data.collateralAmt1 : 0
        var loanAmt = data.loanAmt

        console.log("openPositionHandler() >>")
        console.log(collateralAmt0)
        console.log(collateralAmt1)
        console.log(loanAmt)

        const token0Allowance = await checkAllowance(accountInfo.address, token0)
        console.log("token0Allowance >> ")
        console.log(token0Allowance)
        if (token0Allowance <= 0) {
            console.log("approve for token0")
            await approve(token0, posManager._address)
        }

        const token1Allowance = await checkAllowance(accountInfo.address, token1)
        console.log("token1Allowance >> ")
        console.log(token1Allowance)
        if (token1Allowance <= 0) {
            console.log("approve for token1")
            await approve(token1, posManager._address)
        }

        // TODO
        const createPosition = await posManager.openPosition(
            token0.address,
            token1.address,
            ethers.utils.formatUnits(collateralAmt0, "wei"),
            ethers.utils.formatUnits(collateralAmt1, "wei"),
            ethers.utils.formatUnits(loanAmt, "wei"),
            accountInfo.address,  
        )
        console.log("createPosition")
        console.log(createPosition)/**/
    }

    async function checkAllowance(account: string, token: Token) {
        if (!provider || !accountInfo || !posManager) {
            console.log("provide, version conven certain")
            return
        }
            
        console.log("checking allowance...")
        if (token.symbol) {
            console.log(token.symbol)
        }
        
        if (token.address) 
            console.log(token.address)
        var erc20 = new ethers.Contract(token.address, IERC20.abi, provider)
        console.log(accountInfo.address, posManager.address)
        var allowedAmt = await erc20.allowance(accountInfo.address, posManager.address)
            .then((res: string) => {
                console.log("check allowance ", token.symbol, res)
                return res
            })
            .catch((err: Error) => {
                console.error("checkAllowance", err)
            })
            console.log("allowedAmt >>", allowedAmt)
        return allowedAmt
    }

    async function approve(fromToken: Token, toAddr: string) {
        if (!provider || !accountInfo) {
            console.log("provider or accountInfo not set")
            return
        }
        console.log(fromToken)
        var erc20 = new ethers.Contract(fromToken.address, IERC20.abi, provider)
        const res = await erc20.approve(toAddr, constants.MaxUint256).send({ from: accountInfo.address })
        console.log("approved", fromToken.symbol, res)
    }

    function lookupPairAddress() {
        console.log("looking up pair address", token0.symbol, token1.symbol)
        if (token0 != token1) {
            console.log("valid settings")
            var address = "0xC6CB7f8c046756Bd33ad6b322a3b88B0CA9ceC1b"

            //TODO: when the factory is available need to call it to get the pair's pool address to set

            if (provider) {
                if (accountInfo  && accountInfo?.address) {
                    setPosManager(new ethers.Contract(address, PositionMgr.abi, provider.getSigner(accountInfo?.address)))
                } else {
                    setPosManager(new ethers.Contract(address, PositionMgr.abi, provider))
                }
            } else {
                console.log("Please connect wallet")
            }
        }
    }

    return (
      <OpenLoanView
          openLoanHandler={openLoanHandler}
          token0={token0}
          token1={token1}
          setToken0={setToken0}
          setToken1={setToken1}
      />
    )
}

export default OpenLoanController