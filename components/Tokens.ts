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
        address: "0x2C1c71651304Db63f53dc635D55E491B45647f6f",
        decimals: 18
    },
    {
        imgPath: "/crypto/bat.svg",
        symbol: "BAT",
        address: "0xbed4729d8E0869f724Baab6bA045EB67d72eCb7c",
        decimals: 18
    },
    {
        imgPath: "/crypto/uni.svg",
        symbol: "UNI",
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
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