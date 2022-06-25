export type Token = {
    imgPath: string,
    symbol: string,
    address: string,
}

const Tokens: Array<Token> = [
    {
        imgPath: "/crypto/eth.svg",
        symbol: "ETH",
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    {
        imgPath: "/crypto/aave.svg",
        symbol: "AAVE",
        address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    },
    {
        imgPath: "/crypto/bal.svg",
        symbol: "BAL",
        address: "0xba100000625a3754423978a60c9317c58a424e3D",
    },
    {
        imgPath: "/crypto/uni.svg",
        symbol: "UNI",
        address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    },
    {
        imgPath: "/crypto/usdt.svg",
        symbol: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    },
    {
        imgPath: "/crypto/usdc.svg",
        symbol: "USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
        imgPath: "/crypto/link.svg",
        symbol: "LINK",
        address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    },
    {
        imgPath: "/crypto/wbtc.svg",
        symbol: "WBTC",
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    },
    {
        imgPath: "/crypto/matic.svg",
        symbol: "MATIC",
        address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    },
    {
        imgPath: "/crypto/dai.svg",
        symbol: "DAI",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    },
]

export default Tokens