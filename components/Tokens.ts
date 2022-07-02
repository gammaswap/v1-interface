export type Token = {
    imgPath: string,
    symbol: string,
    address: string,
}

// ROPSTEN TEST NETWORK TOKEN ADDRESSES
const Tokens: Array<Token> = [
    {
        imgPath: "/crypto/eth.svg",
        symbol: "ETH",
        address: "0xbb6f4D4544aB61840226ae0694F737752a69449B",
    },
    {
        imgPath: "/crypto/bat.svg",
        symbol: "BAT",
        address: "0x50390975D942E83D661D4Bde43BF73B0ef27b426",
    },
    {
        imgPath: "/crypto/uni.svg",
        symbol: "UNI",
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    },
    {
        imgPath: "/crypto/usdt.svg",
        symbol: "USDT",
        address: "0x110a13FC3efE6A245B50102D2d79B3E76125Ae83",
    },
    {
        imgPath: "/crypto/usdc.svg",
        symbol: "USDC",
        address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    },
    {
        imgPath: "/crypto/comp.svg",
        symbol: "COMP",
        address: "0xf76D4a441E4ba86A923ce32B89AFF89dBccAA075",
    },
    {
        imgPath: "/crypto/dai.svg",
        symbol: "DAI",
        address: "0x31F42841c2db5173425b5223809CF3A38FEde360",
    },
]

export default Tokens