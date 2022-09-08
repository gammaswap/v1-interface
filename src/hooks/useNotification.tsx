import toast from 'react-hot-toast'

export const notifySuccess = (message: string) => {
  toast.success(message)
  console.log('success: ${message}')
}

export const notifyError = (message: string) => {
  toast.error(message)
  console.log('error: ${message}')
}

export const notifyLoading = (message: string) => {
  return toast.loading(message)
}

export const notifyDismiss = (toastId: string) => {
  toast.dismiss(toastId)
}
