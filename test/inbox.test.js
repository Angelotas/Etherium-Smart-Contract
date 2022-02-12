const assert = require('assert');
const ganace = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganace.provider());
const { interface, bytecode } = require('../compile'); 

let accounts;
let inbox;

beforeEach(async () => { 
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of the accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] }) // create the obtejct to deploy
        .send({ from: accounts[0], gas: '1000000' });   // send the transaction to specific account
});

describe('Inbox', () => {
    it('gets 10 contracts from mocha provider', () => {
        assert.equal(accounts.length, 10);
    });

    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
})