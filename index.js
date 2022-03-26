const SHA256 = require('crypto-js/sha256');

class CryptoBlock {
    constructor(index, timestamp, data, precedingHash=" ") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
        this.nonce = 0;
    }

    computeHash() {
        return SHA256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    proofOfWork(difficulty) {
        while ( this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0") ) {
                this.nonce++;
                this.hash = this.computeHash();
            }
    }
}

class CryptoBlockchain {
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
        this.difficulty = 4;
        this.addedButNotUsed = null; // :)
    }
    startGenesisBlock() {
        return new CryptoBlock(0, "24/11/2021", "Start first Block in the Chain", "0");
    }
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length -1];
    }
    addingNewBlock(newBlock) {
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.proofOfWork(this.difficulty);
        this.blockchain.push(newBlock);  
    }

    checkchainValidity() {
        for(let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
            if (currentBlock.precedingHash !== precedingBlock.hash) {
                return false;
            }
            return true;
        }
    }
}

let yourCoinNameCoin = new CryptoBlockchain();

console.log('yourCoinName in mining.......');
yourCoinNameCoin.addingNewBlock(
    new CryptoBlock(1, "25/11/2021", //change this date for testing.
    { sender: "theSendersName", 
        recipient: "Ta", 
        quanity: 50}));

console.log(JSON.stringify(yourCoinNameCoin, null , 4));
