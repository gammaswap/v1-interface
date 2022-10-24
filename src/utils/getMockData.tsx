import { makeExecutableSchema } from '@graphql-tools/schema'
import { addMocksToSchema } from '@graphql-tools/mock'
import { graphql } from 'graphql'
import { schemaString } from '../queries/mockQueries'
import { faker } from '@faker-js/faker'

export const getGraphQlMockData = (query: string) => {
  const schema = makeExecutableSchema({ typeDefs: schemaString })

  // Create a new schema with mocks
  const schemaWithMocks = addMocksToSchema({
    schema,
    mocks: {
      Post: () => ({
        id: faker.datatype.number(),
        address: faker.finance.ethereumAddress(),
        tokenAvatar1: faker.image.avatar(),
        tokenAvatar2: faker.image.avatar(),
        token1: faker.random.alpha({ count: 3, casing: 'upper' }),
        token2: faker.random.alpha({ count: 3, casing: 'upper' }),
        totalSupply: faker.finance.amount(1000, 4000, 2, '$'),
        supplyAPY: faker.finance.amount(0, 100),
        totalBorrowed: faker.finance.amount(1000, 4000, 2, '$'),
        borrowAPY: faker.finance.amount(0, 100),
      }),
    },
  })

  return graphql({
    schema: schemaWithMocks,
    source: query,
  })
    .then((result) => {
      if (result && result.data && result.data.posts) {
        return result.data.posts
      }
    })
    .catch((err) => console.log('Error', err))
}
