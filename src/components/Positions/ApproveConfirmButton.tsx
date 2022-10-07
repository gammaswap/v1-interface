const style = {
  buttonDiv: 'flex text-xl font-semibold space-x-5 mt-6',
  disabledButton: 'w-1/2 disabled text-center py-3 px-5 rounded-lg text-gray-600 border-2 border-gray-700',
  enabledButton: 'w-1/2 bg-primary-blue text-center py-3 px-5 rounded-lg cursor-pointer',
}

interface ApproveConfirmButtonProps {
  isApproveEnabled: boolean
  isConfirmEnabled: boolean
  approveHandler: () => void
  actionHandler: () => void
}

export const ApproveConfirmButton = ({
  isApproveEnabled,
  isConfirmEnabled,
  approveHandler,
  actionHandler,
}: ApproveConfirmButtonProps) => {
  return (
    <div className={style.buttonDiv}>
      {isApproveEnabled ? (
        <div className={style.enabledButton} onClick={approveHandler}>
          Approve
        </div>
      ) : (
        <div className={style.disabledButton}>Approve</div>
      )}

      {isConfirmEnabled ? (
        <div className={style.enabledButton} onClick={actionHandler}>
          Confirm
        </div>
      ) : (
        <div className={style.disabledButton}>Confirm</div>
      )}
    </div>
  )
}