const assert = require('assert');
const ganace = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganace.provider());

class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let accounts;

beforeEach(async () => { 
    // Get list of all accounts
    accounts = await web3.eth.getAccounts();
});

describe('Inbox', () => {
    it('gets 10 contracts from mocha provider', () => {
        assert.equal(accounts.length, 10);
    });

    it('deploys a contract', () => {
        // Compile the contract
    });
})

/* let car;

beforeEach(() => { 
    car = new Car();
    const printCar = () => console.log(car);
});

describe('Car', () => {
    it('should park', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('should drive', () => {
        assert.equal(car.drive(), 'vroom');
    });
}) */