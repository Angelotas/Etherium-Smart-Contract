const assert = require('assert');
const ganace = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganace.provider());
const { inbox } = require('../compile'); 

const defaultContractMessage = 'Hi there!';
let accounts;
let inboxContract;

beforeEach(async () => { 
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of the accounts to deploy the contract
    inboxContract = await new web3.eth.Contract(JSON.parse(inbox.interface))
        .deploy({ data: inbox.bytecode, arguments: [defaultContractMessage] }) // create the obtejct to deploy
        .send({ from: accounts[0], gas: '1000000' });   // send the transaction to specific account
});

describe('Inbox', () => {
    it('gets 10 contracts from mocha provider', () => {
        assert.equal(accounts.length, 10);
    });

    it('deploys a contract', () => {
        assert.ok(inboxContract.options.address);
    });

    it('has a default message', async () => {
        const message = await inboxContract.methods.message().call();
        assert.equal(message, defaultContractMessage);
    });

    it('can change the message', async () => {
        const newMessage = 'Bye there!';
        await inboxContract.methods.setMessage(newMessage).send({ from: accounts[0], gas: '1000000' });
        const currentMessage = await inboxContract.methods.message().call();
        assert.equal(newMessage, currentMessage);
    });
})