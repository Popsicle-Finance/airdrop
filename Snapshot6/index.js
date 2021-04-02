const { ethers } = require("ethers");
const { BigNumber } = require("ethers");
const cliProgress = require('cli-progress');
const fs = require('fs');

const bscProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/")

const fantomProvider = new ethers.providers.JsonRpcProvider("https://rpc.fantom.network/")

const ethProvider = new ethers.providers.JsonRpcProvider("")

const fantomPairs = ['0x84311ECC54D7553378c067282940b0fdfb913675', '0x93698ad941359a3C771e15CFcE345Abe0191e035']
const fantomStartBlock = 3081198
const fantomEndBlock = 3257500

const bscPairs = ['0xfe3171b9c20d002376d4b0097207edf54b02ea3b', '0xdd60838d3fa7782401e2177ef7611cdb7083a1c1', '0x51F914a192a97408D991FddDAFB8F8537C5Ffb0a', '0x93698ad941359a3C771e15CFcE345Abe0191e035']
const bscStartBlock = 6114219
const bscEndBlock = 6191050

const ethPairs = ['0x0efea698136d636e2babad10821e9064fe08f418', '0xf362dc4bb0d5bfef95d65434a7168b8ae056d8d6']
const ethStartBlock = 12136722
const ethEndBlock = 12154090

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

const ICE_TOKEN = "0xf16e81dce15B08F326220742020379B855B87DF9"

const ICE200 = ethers.utils.parseEther("200")

const ICE1000 = ethers.utils.parseEther("999")

const SLPABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const fetchAddresses = async (provider, pairs, blockStartNumber, blockEndNumber, path) => {
    let currentBlockNumber = blockEndNumber ? blockEndNumber : await provider.getBlockNumber()
    let completeMintArray = []
    let i = 0
    let temp_path = "temp-" + path

    if (fs.existsSync(temp_path)) {
        let tempObj = JSON.parse(fs.readFileSync(temp_path, 'utf8'))
        currentBlockNumber = tempObj.blockNumber
        i = tempObj.i
        completeMintArray = tempObj.completeMintArray
    }
    console.log("--- FETCHING EVENTS ---")
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    bar1.start(pairs.length, i);
    for(;i<pairs.length; i+=1) {
        bar1.update(i+1);
        const slpPair = new ethers.Contract(pairs[i], SLPABI, provider)
        for(var j = blockStartNumber; j < currentBlockNumber; j+=5000) {
            let z = j + 5000 < currentBlockNumber ? j + 5000 - 1 : currentBlockNumber
            //console.log(pairs[i], "startNumber", j, "endNumber", z)
            let mintArray = await slpPair.queryFilter(slpPair.filters.Transfer(), j, z)
            completeMintArray.push(...mintArray)
        }
        let temp = {}
        temp.completeMintArray = completeMintArray
        temp.i = i+1
        temp.blockNumber = currentBlockNumber
        fs.writeFileSync(temp_path, JSON.stringify(temp, null, 4))
    }
    bar1.stop();

    
    let minters = {}

    console.log("--- INDEXING TRANSFERS ---")
    bar1.start(completeMintArray.length, 0);

    for(let k = 0; k < completeMintArray.length; k++) {
        bar1.update(k+1);
        let lpNumber = BigNumber.from(completeMintArray[k].args[2])
        if(completeMintArray[k].args[0] == ZERO_ADDRESS && completeMintArray[k].args[1] != ZERO_ADDRESS) {
            let logs = (await provider.getTransactionReceipt(completeMintArray[k].transactionHash)).logs
            let IceTransferred = BigNumber.from(logs.find(x => x.address === ICE_TOKEN).data)
            //console.log("From", completeMintArray[k].args[0], "To", completeMintArray[k].args[1], "LP", lpNumber.toString(), "ICE", IceTransferred.toString())
            if(!(completeMintArray[k].args[1] in minters)){
                minters[completeMintArray[k].args[1]] = {
                    lpToken: lpNumber,
                    ice: IceTransferred
                }
                //console.log(completeMintArray[k].args[0], completeMintArray[k].args[1])
            } else {
                minters[completeMintArray[k].args[1]].lpToken = minters[completeMintArray[k].args[1]].lpToken.add(lpNumber)
                minters[completeMintArray[k].args[1]].ice = minters[completeMintArray[k].args[1]].ice.add(IceTransferred)
            }
        } else if(!(completeMintArray[k].args[0] == ZERO_ADDRESS && completeMintArray[k].args[1] == ZERO_ADDRESS)){
            //console.log("transfer", completeMintArray[k].args[0], completeMintArray[k].args[1], completeMintArray[k].transactionHash)
            if (minters[completeMintArray[k].args[0]].lpToken.isZero()) {
                continue
            }
            
            let icePerLP = minters[completeMintArray[k].args[0]].ice.div(minters[completeMintArray[k].args[0]].lpToken)
            let IceTransferred = lpNumber.mul(icePerLP)
            //console.log("From", completeMintArray[k].args[0], "To", completeMintArray[k].args[1], "LP", lpNumber.toString(), "ICE", IceTransferred.toString())
            if (completeMintArray[k].args[1] == ZERO_ADDRESS) {
                minters[completeMintArray[k].args[0]].ice = minters[completeMintArray[k].args[0]].ice.sub(IceTransferred)
                minters[completeMintArray[k].args[0]].lpToken = minters[completeMintArray[k].args[0]].lpToken.sub(lpNumber)
            } else {
                minters[completeMintArray[k].args[0]].ice = minters[completeMintArray[k].args[0]].ice.sub(IceTransferred)
                minters[completeMintArray[k].args[0]].lpToken = minters[completeMintArray[k].args[0]].lpToken.sub(lpNumber)
                if(!(completeMintArray[k].args[1] in minters)){
                    minters[completeMintArray[k].args[1]] = {
                        lpToken: lpNumber,
                        ice: IceTransferred
                    }
                } else {
                    minters[completeMintArray[k].args[1]].lpToken = minters[completeMintArray[k].args[1]].lpToken.add(lpNumber)
                    minters[completeMintArray[k].args[1]].ice = minters[completeMintArray[k].args[1]].ice.add(IceTransferred)
                }
            }
        }
    }

    bar1.stop()

    let larger200 = []
    let larger1000 = []

    for (address in minters) {
        if (minters[address].ice.gte(ICE200) && minters[address].ice.lt(ICE1000)) {
            larger200.push(address)
        } else if (minters[address].ice.gte(ICE1000)) {
            larger1000.push(address)
        }
    }

    let addresses = {}
    addresses.cutOffBlock = currentBlockNumber
    addresses.larger200 = larger200
    addresses.larger1000 = larger1000
    addresses.minters = minters

    fs.writeFileSync(path, JSON.stringify(addresses, null, 4))
}

//fetchAddresses(bscProvider, 5205069, undefined, "bsc.json")


fetchAddresses(ethProvider, ethPairs, ethStartBlock , ethEndBlock, "mainnet6.json")
