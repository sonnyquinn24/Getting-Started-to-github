const { ethers } = require("ethers");

const message = "verify";
const signature = "0xda4498c933bff4ed4cbc95a9f0648b8b8ec6619f064a77f11c41b75e2eda6af00c7d5e9021f0ad92e65d6fc4c7115fccc36f36528403184079bc23767b63a1f61b";
const expectedAddress = "0x136B3b784156210A771E4Ec9E6Da9376aBA6D447";

const recovered = ethers.utils.verifyMessage(message, signature);

console.log("Recovered address:", recovered);
console.log("Matches expected:", recovered.toLowerCase() === expectedAddress.toLowerCase());