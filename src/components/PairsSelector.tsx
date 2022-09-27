import * as React from 'react'
import { useState, Dispatch } from 'react'
import { Token } from './Tokens'
import TokenSelectorModal from './TokenSelectorModal'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/solid'

const style = {
  header: "font-semibold text-neutrals-400 w-full",
  pairContainer: "flex justify-around items-center w-full mt-2",
  tokenSelectorContainer: 'text-neutrals-100',
  tokenSelectorContent: 'w-full flex items-center space-x-2 rounded-xl text-xl bg-neutrals-800 drop-shadow-md cursor-pointer p-2 hover:bg-neutrals-600',
  nonSelectedTokenContent: 'w-full flex items-center bg-primary-blue rounded-xl text-xl font-medium cursor-pointer py-2 px-3 shadow-md shadow-blue-300/20 hover:bg-blue-400 hover:shadow-blue-400/20',
  tokenSelectorIcon: "flex items-center",
  tokenSelectorTicker: "",
  dropdownArrow: "w-8 h-8",
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
        <div className={style.header}>Select Token Pair</div>
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
                  <div className={style.nonSelectedTokenContent} onClick={() => onOpenToken(1)} >Select Token</div>
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
        />
      </>
    )
}

export default PairsSelector