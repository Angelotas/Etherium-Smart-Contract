const assert = require('assert');
const ganace = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganace.provider());
const { lottery } = require('../compile'); 

let accounts;
let lotteryContract;

beforeEach(async () => { 
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of the accounts to deploy the contract
    lotteryContract = await new web3.eth.Contract(JSON.parse(lottery.interface))
        .deploy({ data: lottery.bytecode }) // create the obtejct to deploy
        .send({ from: accounts[0], gas: '1000000' });   // send the transaction to specific account
});

describe('Inbox', () => { 
    it('gets 10 contracts from mocha provider', () => {
        assert.equal(accounts.length, 10);
    });

    it('deploys a contract', () => {
        assert.ok(lotteryContract.options.address);
    });

    it('allows one account to enter', async() => {
        await lotteryContract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        const players = await lotteryContract.methods.getPlayerList().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });

    it('allows multiple account to enter', async() => {
        await lotteryContract.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lotteryContract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lotteryContract.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });
        const players = await lotteryContract.methods.getPlayerList().call({
            from: accounts[0]
        });

        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it('requires a minimun amount of ether to enter', async () => {
        try {
            await lotteryContract.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0.001', 'ether')
            });
            assert(false);
        } catch (err) { 
            assert(true);
        }
    });

    it('only manager can call pick a random winner', async () => {
        try {
            await lotteryContract.methods.pickRandomWinner().send({
                from: accounts[1]
            });
            assert(false);
        } catch (err) { 
            assert(true);
        }
    });

    it('sends money to the winner and reset player list', async () => {
        await lotteryContract.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalenace = await web3.eth.getBalance(accounts[1]);

        await lotteryContract.methods.pickWinnerAndSendMoney().send({
            from: accounts[0]
        });

        const players = await lotteryContract.methods.getPlayerList().call({
            from: accounts[0]
        });

        const finalBalance = await web3.eth.getBalance(accounts[1]);
        const difference = (finalBalance - initialBalenace).toString();

        const contractBalance = await web3.eth.getBalance(lotteryContract.options.address);
    
        assert(
            web3.utils.fromWei(difference.toString(), 'ether') == 2 &&
            players.length == 0 &&
            contractBalance == 0
        );
    });
});
