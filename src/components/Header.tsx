import React, { useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import truncateEthAddress from 'truncate-eth-address'
import { WalletContext } from '../context/WalletContext'

const style = {
  wrapper: "border p-4 w-screen flex justify-between items-center bg-violet-50",
  headerLogo: "w-1/3 flex cursor-pointer",
  nav: "flex-1 flex justify-center items-center",
  navItemsContainer: "flex bg-red-400 rounded-3xl",
  navItem: "px-4 py-2 m-1 text-lg font-semibold cursor-pointer rounded-3xl h-12",
  activeNavItem: "bg-gray-400",
  buttonsContainer: "flex w-1/3 justify-end items-center",
  button: "m-1 flex items-center bg-red-400 text-md font-semibold cursor-pointer rounded-2xl h-12",
  buttonPadding: "p-2",
  balanceContainer: "mx-2 text-md flex items-center",
  buttonTextContainer: "bg-gray-400 rounded-lg px-4 py-2 text-md h-8 flex items-center",
  buttonAccent: "bg-blue-600 border border-[#163256] text-blue-200 h-full flex justify-center items-center rounded-xl",
}

const Header = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("positions")
  const { accountInfo, connectWallet } = useContext(WalletContext)

  return (
    <div className={style.wrapper}>
      <Link href={'/positions'}>
        <div className={style.headerLogo}>
          <Image src="/gsLogo.png" alt="GammaSwap logo" width={56} height={56} />
        </div>
      </Link>
      <nav className={style.nav}>
        <div className={style.navItemsContainer}>
          <Link href={'/swap'}>
            <div
              onClick={() => setSelectedNavItem('swap')}
              className={`${style.navItem} ${selectedNavItem === 'swap' && style.activeNavItem
                }`}
            >
              Swap
            </div>
          </Link>
          <Link href={'/positions'}>
            <div
              onClick={() => setSelectedNavItem("positions")}
              className={`${style.navItem} ${selectedNavItem === "positions" && style.activeNavItem
                }`}
            >
              Positions
            </div>
          </Link>
          <Link href={'/pools'}>
            <div
              onClick={() => setSelectedNavItem("pools")}
              className={`${style.navItem} ${selectedNavItem === "pools" && style.activeNavItem
                }`}
            >
              Pools
            </div>
          </Link>
        </div>
      </nav>
      <div className={style.buttonsContainer}>
        <Link href={'/buyeth'}>
          <div className={`${style.button} ${style.buttonPadding}`}>
            Buy ETH
          </div>
        </Link>
        {accountInfo?.address ? (
          <div
            onClick={() => connectWallet()}
            className={`${style.button} ${style.buttonPadding}`}
          >
            <div className={style.balanceContainer}>
              {accountInfo.balance?.slice(0, 6)}
            </div>
            <div className={style.buttonTextContainer}>
              {truncateEthAddress(accountInfo.address)}
            </div>
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${style.button} ${style.buttonPadding}`}
          >
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
              Connect Wallet
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header;