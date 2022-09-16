import React, { useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import truncateEthAddress from 'truncate-eth-address'
import { WalletContext } from '../context/WalletContext'

const style = {
  wrapper: "p-4 w-screen flex justify-between items-center",
  headerLogo: "w-1/3 flex cursor-pointer pl-2",
  nav: "flex-1 flex justify-center items-center",
  navItemsContainer: "flex bg-neutrals-700 rounded-2xl drop-shadow-lg",
  navItem: "px-4 py-2 m-1 text-lg cursor-pointer rounded-xl h-12 hover:bg-neutrals-600",
  activeNavItem: "bg-neutrals-800",
  buttonsContainer: "flex w-1/3 justify-end items-center",
  ethButton: "m-2 flex space-x-2 items-center bg-primary-grey text-md cursor-pointer rounded-2xl h-12 drop-shadow-lg hover:bg-neutrals-700 hover:shadow-neutrals-700/30",
  button: "m-2 flex items-center bg-primary-grey text-md cursor-pointer rounded-2xl h-12 drop-shadow-lg hover:bg-neutrals-700 hover:shadow-neutrals-700/30",
  buttonPadding: "p-3",
  balanceContainer: "mx-2 text-md flex items-center",
  buttonTextContainer: "bg-neutrals-600 rounded-lg px-4 py-2 text-md h-8 flex items-center"
}

const Header = () => {
  const [selectedNavItem, setSelectedNavItem] = useState("positions")
  const { accountInfo, connectWallet } = useContext(WalletContext)

  return (
    <div className={style.wrapper}>
      <Link href={'/positions'}>
        <div className={style.headerLogo}>
          <Image src="/GammaSwap-Logo-White-isoColor.svg" alt="GammaSwap logo" width={250} height={56} />
        </div>
      </Link>
      <nav className={style.nav}>
        <div className={style.navItemsContainer}>
          <Link href={'/pools/main'}>
            <div
              onClick={() => setSelectedNavItem("pools")}
              className={`${style.navItem} ${selectedNavItem === "pools" && style.activeNavItem
                }`}
            >
              Pools
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
        </div>
      </nav>
      <div className={style.buttonsContainer}>
        <Link href={'/buyeth'}>
          <div className={`${style.ethButton} ${style.buttonPadding}`}>
            <Image src={"/walletIcon.svg"} width={24} height={24} />
            <h1>Buy ETH</h1>
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
            Connect Wallet
          </div>
        )}
      </div>
    </div>
  )
}

export default Header;