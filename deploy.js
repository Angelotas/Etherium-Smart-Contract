const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require('./compile');

const fs = require('fs');
const MNEMONIC = fs.existsSync(".secret") && fs.readFileSync(".secret").toString().trim();

const provider = new HDWalletProvider(MNEMONIC, "https://rinkeby.infura.io/v3/78a18edf98c34dcfa7202bebff714a56");
const web3 = new Web3(provider);

const deploy = async () => {
    // get the accounts from the provider
    const accounts = await web3.eth.getAccounts();
    // use one of the accounts to deploy the contract
    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] }) // create the obtejct to deploy
        .send({ from: accounts[0], gas: '1000000' });   // send the transaction to specific account
    // return the address of the contract
    provider.engine.stop();
    return result.options.address;
};

deploy().then(address => {
    console.log("Contract deployed to: " + address);
});
