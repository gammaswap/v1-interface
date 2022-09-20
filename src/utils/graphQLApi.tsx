import { notifyError } from '../hooks/useNotification'

export const callApi = async (data: string) => {
  const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL || ''

  if (SUBGRAPH_URL) {
    return await fetch(SUBGRAPH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(async (res) => await res.json())
      .then(async (response) => {
        if (response?.data) {
          return await response.data
        }
      })
      .catch((err) => {
        notifyError('An error occurred while fetching data from subgraph')
        console.log(err)
      })
  } else {
    notifyError('Subgraph url not found')
  }
}
