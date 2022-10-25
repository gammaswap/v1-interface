export const schemaString = /* GraphQL */ `
  type Post {
    id: ID!
    address: String!
    tokenAvatar1: String!
    tokenAvatar2: String!
    token1: String!
    token2: String!
    totalSupply: String!
    supplyAPY: String!
    totalBorrowed: String!
    borrowAPY: String!
  }

  type Query {
    posts: [Post]!
  }
`
