import { notifyError } from '../hooks/useNotification'

export const callSubgraph = async (data: string) => {
  const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL || ''

  if (SUBGRAPH_URL && data) {
    try {
      let result = await (
        await fetch(SUBGRAPH_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data })
      ).json()
      if (result?.data) {
        return result?.data
      }
    } catch (err) {
      notifyError('An error occurred while fetching data from subgraph')
    }
  } else {
    if (!SUBGRAPH_URL) {
      notifyError('Subgraph url not found')
    }

    if (!data) {
      notifyError('No query found to be queried from subgraph')
    }
  }
}
