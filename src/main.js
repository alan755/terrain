const SHA256 = require('crypto-js/sha256')

class Block {

  constructor(index, timestamp, data, previousHash = '') {

    this.index = index
    this.timmestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.Hash = this.calculateHash()
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp +  JSON.stringify(this.data)).toString()
  }
}

class Blockchain {
  
  constructor() {
    this.chain = [this.creategenesisblock()]
  }

  creategenesisblock() {
    return new Block(0, "11/8/18", "Genesis-Block", "0")
  }

  getlatestblock() {
    return this.chain[this.chain.length - 1]
  }

  addblock(newblock) {
    newblock.previousHash = this.getlatestblock().Hash
    newblock.Hash = newblock.calculateHash()
    this.chain.push(newblock)
  }
}

var terrain = new Blockchain()
terrain.addblock(new Block (1, "12/8/18", "{ amount: 4}"))
terrain.addblock(new Block (2, "13/8/18", "{ amount: 4}"))

console.log(JSON.stringify(terrain, null, 4))