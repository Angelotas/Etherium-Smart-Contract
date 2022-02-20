const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { inbox, lottery } = require("./compile");

const fs = require('fs');
const MNEMONIC = fs.existsSync(".secret") && fs.readFileSync(".secret").toString().trim();

const provier = new HDWalletProvider(MNEMONIC, "https://rinkeby.infura.io/v3/78a18edf98c34dcfa7202bebff714a56");
const web3 = new Web3(provier);

const deployInbox = async () => {
    // get the accounts from the provider
    const accounts = await web3.eth.getAccounts();
    // use one of the accounts to deploy the contract
    const result = await new web3.eth.Contract(JSON.parse(inbox.interface))
        .deploy({ data: inbox.bytecode, arguments: ['Hi there!'] }) // create the obtejct to deploy
        .send({ from: accounts[0], gas: '1000000' });   // send the transaction to specific account
    // return the address of the contract
    return result.options.address;
};

deployInbox().then(address => {
    console.log("Contract deployed to: " + address);
});

const deployLottery = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(lottery.interface))
    .deploy({ data: lottery.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deployLottery();