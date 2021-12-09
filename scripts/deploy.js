async function main() {
  const MyNFT1 = await ethers.getContractFactory('MyNFT1');

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await MyNFT1.deploy();
  console.log('Contract deployed to address:', myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
