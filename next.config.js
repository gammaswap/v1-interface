/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/positions',
        permanent: true,
      }
    ]
  },
  env: {
    ETH_CHAIN_ID: '3',
    ETH_CHAIN: 'ropsten',
    ROPSTEN_TOKEN_A_ADDR: '0x2C1c71651304Db63f53dc635D55E491B45647f6f',
    ROPSTEN_TOKEN_B_ADDR: '0xbed4729d8E0869f724Baab6bA045EB67d72eCb7c',
    IUNISWAP_V2_FACTORY_ADDR: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    IUNISWAP_V2_PAIR_ADDR: '0x1c5DEe94a34D795f9EEeF830B68B80e44868d316',
    IUNISWAP_V2_ROUTER_02_ADDR: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  }
}
