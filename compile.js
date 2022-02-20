const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const sourceInbox = fs.readFileSync(inboxPath, 'utf8');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const sourceLottery = fs.readFileSync(lotteryPath, 'utf8');

module.exports = {
    inbox: solc.compile(sourceInbox, 1).contracts[':Inbox'],
    lottery: solc.compile(sourceLottery, 1).contracts[':Lottery']
}
