const { rpc, contractAddress, amount } = require("./config")
const abi = require("./abi.json")
const ethers = require("ethers")
const addresses = [

]
const getContract = async (
    wallets,
    amounts
) => {
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(process.env.key, provider);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const result = await contract.functions._multiSendToken(contractAddress, wallets, amounts);
    return (
        {
            tx: result
        }
    )
}
const fs = require('fs')
const path = require('path')
const fastCsv = require('fast-csv')
const readCSV = (csvFilePath) => {
    console.log("Sorting Address")
    const readData = fs.createReadStream("./data.csv")
    const data = []
    readData
        .pipe(fastCsv.parse())
        .on('data', (row) => {
            // data.push(row)
            addresses.push(row[4], row[5])
            // console.log('To:', row[4])
            // console.log('From:', row[5])
            // console.log('\n')
        })
        .on('end', async (rowCount) => {
            //console.log(`${rowCount} rows parsed!`)
            // console.log(data)
            console.log(addresses.length, "Wallet addresses gathered")
            //getContract()
            for (let index = 2; index < addresses.length; index = index + 50) {
                console.log("batch No:", index)
                let starter = index
                let wallets = []
                let amounts = []
                for (let i = starter; i <= starter + 49; i++) {
                    amounts.push(amount);
                    wallets.push(addresses[i])
                }
                await getContract(wallets, amounts)
                // console.log(wallets, amounts)

            }


            //send
            //split into
        })
        .on('error', (e) => console.error(e))
}
const pathCsv = path.resolve(__dirname, 'users.csv')
readCSV(pathCsv)

