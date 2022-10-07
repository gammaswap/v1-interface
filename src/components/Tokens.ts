export type Token = {
    imgPath: string,
    symbol: string,
    address: string,
    decimals: number,
}

// ROPSTEN TEST NETWORK TOKEN ADDRESSES
const Tokens: Array<Token> = [
    {
        imgPath: "/crypto/eth.svg",
        symbol: "ETH",
        address: '',
        decimals: 18
    },
    {
        imgPath: "/crypto/bat.svg",
        symbol: "BAT",
        address: process.env.NEXT_PUBLIC_TOKEN_B_ADDR || '',
        decimals: 18
    },
    {
        imgPath: "/crypto/uni.svg",
        symbol: "UNI",
        address: process.env.NEXT_PUBLIC_TOKEN_A_ADDR || '',
        decimals: 18
    },
    {
        imgPath: "/crypto/usdt.svg",
        symbol: "USDT",
        address: "0x110a13FC3efE6A245B50102D2d79B3E76125Ae83",
        decimals: 6
    },
    {
        imgPath: "/crypto/usdc.svg",
        symbol: "USDC",
        address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        decimals: 6
    },
    {
        imgPath: "/crypto/link.svg",
        symbol: "LINK",
        address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        decimals: 18
    },
    {
        imgPath: "/crypto/wbtc.svg",
        symbol: "WBTC",
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        decimals: 8
    },
    {
        imgPath: "/crypto/comp.svg",
        symbol: "COMP",
        address: "0xf76D4a441E4ba86A923ce32B89AFF89dBccAA075",
        decimals: 18
    },
    {
        imgPath: "/crypto/dai.svg",
        symbol: "DAI",
        address: "0x31F42841c2db5173425b5223809CF3A38FEde360",
        decimals: 18
    },
]

export default Tokens