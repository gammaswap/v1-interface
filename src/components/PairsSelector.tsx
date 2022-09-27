import * as React from 'react'
import { useState, Dispatch } from 'react'
import { Token } from './Tokens'
import TokenSelectorModal from './TokenSelectorModal'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'

const style = {
  header: "w-full font-semibold text-gray-200",
  pairContainer: "inline-flex w-full mt-3",
  tokenSelectorContainer: "px-6 text-gray-200 w-1/2",
  nonSelectedTokenContent: "flex justify-center items-center bg-blue-500 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30",
  tokenSelectorContent: "flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900 hover:shadow-gray-900/30",
  tokenSelectorIcon: "flex items-center",
  tokenSelectorTicker: "mx-2",
  dropdownArrow: "w-12 h-8",
}

type PairsSelectorProps = {
  token0: Token
  token1: Token
  setToken0: Dispatch<React.SetStateAction<Token>>
  setToken1: Dispatch<React.SetStateAction<Token>>
}

const PairsSelector = ({token0, token1, setToken0, setToken1}: PairsSelectorProps) => {
    const [tokenNumber, setTokenNumber] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    function onOpenToken(tokenNumber: number) {
        setTokenNumber(tokenNumber)
        setIsOpen(true)
    }

    function isTokenEmpty(tokenToCheck: Token): boolean {
      return Object.values(tokenToCheck).every(tokenProp => tokenProp === "" || tokenProp === 0)
    }

    return (
      <>
        <div className={style.header}> Select a Token Pair</div>
        <div className={style.pairContainer}>
            <div className={style.tokenSelectorContainer}>
                <div className={style.tokenSelectorContent} onClick={() => onOpenToken(0)} >
                    <div className={style.tokenSelectorIcon}>
                        <Image src={token0.imgPath} alt="token logo" width={32} height={32}/>
                    </div>
                    <div className={style.tokenSelectorTicker}>{token0.symbol}</div>
                    <ChevronDownIcon className={style.dropdownArrow}/>
                </div>
            </div>
            <div className={style.tokenSelectorContainer}>
            {isTokenEmpty(token1) 
                ? (
                  <div className={style.nonSelectedTokenContent} onClick={() => onOpenToken(1)} >
                      <div className={style.tokenSelectorIcon}>
                          <Image src={token0.imgPath} width={0} height={32}/>
                      </div>
                      Select Token
                  </div>
                ) : (
                  <div className={style.tokenSelectorContent} onClick={() => onOpenToken(1)} >
                      <div className={style.tokenSelectorIcon}>
                          <Image src={token1.imgPath} alt="token logo" width={32} height={32}/>
                      </div>
                      <div className={style.tokenSelectorTicker}>{token1.symbol}</div>
                      <ChevronDownIcon className={style.dropdownArrow}/>
                  </div>
                )
            }
            </div>
        </div>
        <TokenSelectorModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setTokenSelected={ tokenNumber === 0 ? setToken0 : setToken1 }
            otherToken={tokenNumber === 0 ? token1 : token0}
        />
      </>
    )
}

export default PairsSelector