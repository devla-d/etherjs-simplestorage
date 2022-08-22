const ethers = require('ethers');
const fs = require('fs-extra');
require('dotenv').config();


async function main() {

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const abi = fs.readFileSync("./Simplestorage_sol_DemoContract.abi", "utf8");
    const binary = fs.readFileSync('./Simplestorage_sol_DemoContract.bin', 'utf8')

    const contractfactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log('Deploying contract.....')
    const contract = await contractfactory.deploy()
    await contract.deployTransaction.wait(1)
    console.log(`contract address is : ${contract.address}`)


    const currentFavoritenum = await contract.get()
    console.log(`current Favorite number. is  : ${currentFavoritenum.toString()}`)

    const transactionResponse = await contract.set('8')
    const transactionreciept = await transactionResponse.wait(1)
    const updatedFavoritenum = await contract.get()
    console.log(`Updated Favorite number. is  : ${updatedFavoritenum.toString()}`)
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err)
    })