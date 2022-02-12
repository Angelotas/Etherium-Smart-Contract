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

beforeEach(() => { 
    // Get list of all accounts
    web3.eth.getAccounts().then((accounts) => console.log(accounts));
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.equal('stopped', 'stopped');
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