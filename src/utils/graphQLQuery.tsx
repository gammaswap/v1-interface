export const PoolCreatedQuery = {
  query: `
    {
        poolCreateds {
            id
            pool
            cfmm
            protocolId
            protocol
            count
        }
    }
    `,
}

export const LoanQuery = {
  query: `
    {
        loans {
            pool
            tokenId
        }
    }
    `,
}
