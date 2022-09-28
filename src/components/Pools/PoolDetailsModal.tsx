import React, { Dispatch, SetStateAction, ReactElement, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import { PoolData } from './PoolTableRow'
import Link from "next/link"

type DetailsModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  poolData: PoolData | undefined
}

const style = {
  modalWrapper: 'relative z-50',
  modalOverlay: 'fixed inset-0 bg-black/50 flex items-center justify-center p-4',
  modal: 'bg-gray-800 rounded-xl max-w-sm max-h-sm p-8 flex flex-col text-white drop-shadow-lg',
  headingContainer: 'flex',
  closeIcon: 'w-7 h-7 ml-auto cursor-pointer',
  modalTitle: 'font-semibold text-xl w-full text-center',
  headingBreak: 'mt-2 opacity-10',
  poolDataContainer: 'mt-4 space-y-1 w-64',
  dataContainer: 'flex text-md hover:bg-gray-700 rounded-lg p-3 cursor-pointer',
  dataTitle: 'font-semibold',
  dataValue: 'ml-auto',
  depositButton: 'bg-primary-blue rounded-xl py-4 text-xl font-semibold text-center cursor-pointer text-white hover:bg-gradient-to-tr hover:from-accents-royalBlue hover:via-primary-blue hover:to-cyan-400',
}
const PoolDetailsModal = ({
  isOpen,
  setIsOpen,
  poolData,
}: DetailsModalProps): ReactElement => {
  if (!poolData) {
    return <></>
  }
  const closeIconRef = useRef(null)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as={'div'} onClose={() => setIsOpen(false)} className={style.modalWrapper} initialFocus={closeIconRef}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={style.modalOverlay}>
            <Dialog.Panel className={style.modal}>
              <div className={style.headingContainer}>
                <Dialog.Title className={style.modalTitle}>{poolData.name}</Dialog.Title>
                <XIcon className={style.closeIcon} onClick={() => setIsOpen(false)} ref={closeIconRef} />
              </div>
              <hr className={style.headingBreak}></hr>
              <div className={style.poolDataContainer}>
                <div className={style.dataContainer}>
                  <div className={style.dataTitle}>Total Supply</div>
                  <div className={style.dataValue}>{poolData.totalSupply}</div>
                </div>
                <div className={style.dataContainer}>
                  <div className={style.dataTitle}>Supply APY</div>
                  <div className={style.dataValue}>{poolData.supplyApy}</div>
                </div>
                <div className={style.dataContainer}>
                  <div className={style.dataTitle}>Total Borrowed</div>
                  <div className={style.dataValue}>{poolData.totalBorrowed}</div>
                </div>
                <div className={style.dataContainer}>
                  <div className={style.dataTitle}>Borrow APY</div>
                  <div className={style.dataValue}>{poolData.borrowApyStable}</div>
                </div>
                <Link href={"/positions/deposit/" + poolData.address}>
                  <div className={style.depositButton} >
                    Provide Liquidity
                  </div>
                </Link>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default PoolDetailsModal
