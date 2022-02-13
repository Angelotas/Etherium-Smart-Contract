// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Inbox {
    string public message;

    // storage --> parameter by reference
    // memory --> parameter by value

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
