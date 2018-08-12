const SHA256 = require('crypto-js/sha256')

class Block {

  constructor(index, timestamp, data, previousHash = '') {

    this.index = index
    this.timmestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.Hash = this.calculateHash()
    this.nonce = 0
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp +  JSON.stringify(this.data) + this.nonce).toString()
  }

  mineblock (difficulty) {

    while(this.Hash.substring(0, difficulty) != Array(difficulty + 1).join("0")) {
      this.nonce++
      this.Hash = this.calculateHash()
    }
    console.log('Block Mined: ' + this.Hash)
  }
}

class Blockchain {
  
  constructor() {
    this.chain = [this.creategenesisblock()]
    this.difficulty = 2
  }

  creategenesisblock() {
    return new Block(0, "11/8/18", "Genesis-Block", "0")
  }

  getlatestblock() {
    return this.chain[this.chain.length - 1]
  }

  addblock(newblock) {
    newblock.previousHash = this.getlatestblock().Hash
    newblock.mineblock(this.difficulty)
    this.chain.push(newblock)
  }

  validity() {
    for (let i = 1; i < this.chain.length; i++) {
      var curblock = this.chain[i]
      var prevblock = this.chain[i - 1]

      if (curblock.Hash != curblock.calculateHash()) {
        return false
      }

      if (curblock.previousHash != prevblock.Hash) {
        return false
      }
    }

    return true
  }
}

var terrain = new Blockchain()
console.log('Mining block 1...')
terrain.addblock(new Block (1, "12/8/18", "{ amount: 4}"))
console.log('Mining block 2...')
terrain.addblock(new Block (2, "13/8/18", "{ amount: 4}"))
