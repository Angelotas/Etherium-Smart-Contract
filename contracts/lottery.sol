pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable minimumEtherRequired {
        players.push(msg.sender);
    }

    function pickWinnerAndSendMoney() public managerRequired {
        pickRandomWinner().transfer(this.balance);
        players = new address[](0);
    }

    function getPlayerList() public view returns (address[]) {
        return players;
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(block.difficulty, now, players));
    }

    function pickRandomWinner() private view returns (address) {
        uint256 index = uint256(random() % players.length);
        return players[index];
    }

    modifier managerRequired() {
        // just manager can call this method
        require(msg.sender == manager);
        _;
    }

    modifier minimumEtherRequired() {
        // just more than 0.01 ehter is allowed
        require(msg.value > .01 ether);
        _;
    }
}
