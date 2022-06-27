const useNotification = () => {

  const notifySuccess = (message: string) => console.log(`success: ${message}`)
  const notifyError = (message: string) => console.log(`error: ${message}`)

  return {
    notifySuccess,
    notifyError
  }
}

export default useNotification
