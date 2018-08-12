const SHA256 = require('crypto-js/sha256')

class transaction {
  
  constructor(fromaddr, toaddr, amount) {
    this.fromaddr = fromaddr
    this.toaddr = toaddr
    this.amount = amount
  }
}

class Block {

  constructor(timestamp, transactions, previousHash = '') {

    this.timmestamp = timestamp
    this.transactions = transactions
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
    console.log('\nBlock Mined: ' + this.Hash)
  }
}

class Blockchain {
  
  constructor() {
    this.chain = [this.creategenesisblock()]
    this.difficulty = 2
    this.pendingtransactions = []
    this.miningreward = 100
  }

  creategenesisblock() {
    return new Block(0, "11/8/18", "Genesis-Block", "0")
  }

  getlatestblock() {
    return this.chain[this.chain.length - 1]
  }

  /*addblock(newblock) {
    newblock.previousHash = this.getlatestblock().Hash
    newblock.mineblock(this.difficulty)
    this.chain.push(newblock)
  }*/
  
  // new mining method
  minependingtransactions(miningrewardaddress) {

    let block = new Block (Date.now(), this.pendingtransactions)
    block.mineblock(this.difficulty)

    console.log('\nBlock successfully mined!')
    this.chain.push(block)

    this.pendingtransactions = [
      new transaction(null, miningrewardaddress, this.miningreward)
    ]
  }

  createtransaction(transaction) {

    this.pendingtransactions.push(transaction)
  }

  getbalanceofaddress(address) {
    let balance = 0

    for(const block of this.chain) {
      for(const trans of block.transactions) {

        if (trans.fromaddr == address) {
          balance -= trans.amount
        }

        if (trans.toaddr == address) {
          balance += trans.amount
        }
      }
    }

    return balance
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

terrain.createtransaction(new transaction("addr1", "addr2", 100))
terrain.createtransaction(new transaction("addr2", "addr1", 50))

console.log('Strarting the miner..')
terrain.minependingtransactions("alan")
console.log('\nBalance of the miner : ' + terrain.getbalanceofaddress("alan"))

console.log('\nStrarting the miner again..')
terrain.minependingtransactions("alan")
console.log('\nBalance of the miner : ' + terrain.getbalanceofaddress("alan"))
