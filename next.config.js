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
  }
}
