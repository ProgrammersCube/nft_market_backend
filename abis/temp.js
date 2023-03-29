const abiDecoder = require('abi-decoder');
var marketplaceabi=require("../abis/marketplaceabi.json")
var abi=require("../abis/abi.json")

abiDecoder.addABI(marketplaceabi.abi);

const logs =[{
    address: '0x8615EBeF0de73bCdf241746a63BadB661c779771',
    topics: [
      '0x2fbc6c8b5558f1179fb3a84081838dbb0096f101b049670f278b408a723e2b55'
    ],
    data: '0x0000000000000000000000000000000000000000000000000000000000000011618b4e9c3bd00543a6db6e4d11ec8cfb73f72d0f10682b70dc0e2fccae67a967',
    blockNumber: 21078718,
    transactionHash: '0xbbbf65970228b2e57228a894de12eb038fcf1c1584828126cc0de4cff2c18689',
    transactionIndex: 8,
    blockHash: '0xadb295df1c7755ece8c301258f43a1aabde547b653c42a44922672f27ecbd392',
    logIndex: 12,
    removed: false,
    id: 'log_f26f3408'
  }]
//   const logs=[
//     {
//       "address": "0x919011D65D98E6Cd96cA544862d8429653A04bc1",
//       "topics": [
//         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//         "0x0000000000000000000000000000000000000000000000000000000000000000",
//         "0x00000000000000000000000033a174b4b629f6b8f8b3617f0a2e7c375945900e",
//         "0x0000000000000000000000000000000000000000000000000000000000000016"
//       ],
//       "data": "0x",
//       "blockNumber": 21079474,
//       "transactionHash": "0xdf76205f42a99b59b0771537aaeeb5aaa5a760e04d57386a881041c57d57b3b9",
//       "transactionIndex": 2,
//       "blockHash": "0xb35e431ec4d109e23454fb1c1549645c0634eba0d495341b94073db821ea84ee",
//       "logIndex": 1,
//       "removed": false,
//       "id": "log_1214f0e8"
//     },
    
//   ]
  const decodedLogs = abiDecoder.decodeLogs(logs);

  