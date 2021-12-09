require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);

const contract = require('../artifacts/contracts/MyNFT1.sol/MyNFT1.json');
const contractAddress = '0x468a1ee6266133d68A6541554433d5172D3b3b8D';
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function transferNFT(tokenId, gnosisAddr) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.transferNFT(tokenId, gnosisAddr).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
        if (!err) {
          console.log(
            'The hash of your transaction is: ',
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!"
          );
        } else {
          console.log('Something went wrong when submitting your transaction:', err);
        }
      });
    })
    .catch((err) => {
      console.log(' Promise failed:', err);
    });
}

transferNFT(1, "0x37492bc3a6B1D7F605d3cF8d3C53227ed2961968");
