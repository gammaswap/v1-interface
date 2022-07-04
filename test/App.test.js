
const PosManager = require('../abis/PositionManager.json');
const DepPool = require('../abis/DepositPool.json');
const IERC20Metadata = require('../abis/IERC20Metadata.json');
const Web3 = require('web3');
const IERC20 = require('../abis/ERC20.json');
const { BigNumber, constants, ethers } = require('ethers')

contract('GammaSwap', ([deployer, investor, developer, governor, account4]) => {

    let tokenAaddr = "0x2C1c71651304Db63f53dc635D55E491B45647f6f";
    let tokenBaddr = "0xbed4729d8E0869f724Baab6bA045EB67d72eCb7c";
    let uniRouterAddr = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    let uniPairAddr = "0x0ea795cc5f3db9607feadfdf56a139264179ef1e";
    let uniFactoryAddr = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
    let positionManagerAddr = '0x71ef2e1FeE7a0C8F32C2e45209691121d858340f';

    it('should connect to ropsten', async function () {
        if (typeof web3 !== 'undefined') {
            web3 = new Web3(new Web3.providers.HttpProvider(
                'https://ropsten.infura.io/v3/64345c330e5e4be999128160f76ad0e7'
            ));
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/"));
        }

        const id = await web3.eth.net.getId();
        const provider =  new ethers.providers.EtherscanProvider('ropsten');
        // Pos Manager
        const deployedNetwork = PosManager.networks[id];
        const posManager = new ethers.Contract(
            PosManager.abi,
            deployedNetwork.address,provider
        );

        console.log('Herh 2')
        // Dep Pool
        const _depPool = DepPool.networks[id];
        const depPoolContract = new ethers.Contract(
            DepPool.abi,
            _depPool.address
        );
        console.log('Herh')
        const token0Addr = await depPoolContract.methods.token0().call();
        const token1Addr = await depPoolContract.methods.token1().call();

        const _token0 = new ethers.Contract(IERC20Metadata.abi, token0Addr);
        const _token1 = new ethers.Contract(IERC20Metadata.abi, token1Addr);

        const symbol0 = await _token0.methods.symbol().call();
        const symbol1 = await _token1.methods.symbol().call();


        if (_token0.address) 
            console.log(token.address)
        var erc20 = new ethers.Contract(_token0.address, IERC20.abi)
        console.log(deployer, _depPool.address)
        var allowedAmt = await erc20.allowance(deployer, _depPool.address)
            .then((res) => {
                console.log("check allowance ", token.symbol, res)
                return res
            })
            .catch((err) => {
                console.error("checkAllowance", err)
            })
            console.log("allowedAmt >>", allowedAmt)
        console.log(allowedAmt)
















        // const allowedAmt = await _token0.methods.allowance(depPoolContract._address, deployer).call();
        // console.log(allowedAmt);
        // console.log(constants.MaxUint256.toString())

        // if (allowedAmt <= 0) {
        //     await _token0.methods.approve(deployer, 20);
        // }

        // const allowedAmt2 = await _token0.methods.allowance(depPoolContract._address, deployer).call();
        // console.log(allowedAmt2);

    //     const token1Allowance = await checkAllowance(account, token1);
    //     if (token1Allowance <= 0) {
    //         await approve(token1, depPool._address)
    //     }

        // const addLiquidity = await depPoolContract.methods.addLiquidity(
        //     Web3.utils.toWei((20).toString(), "ether"),
        //     Web3.utils.toWei((20).toString(), "ether"),
        //     (0).toString(),
        //     (0).toString(),
        //     account
        // ).send({ from: account })
        // .then(res => {
        //     console.log("Liquidity has been Deposited.")
            
        // })
        // .catch(err => {
        //     console.error(err)
        // })


    
    })
});