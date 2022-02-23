const { expect } = require("chai");
const { ethers } = require("hardhat");

const ipfsTestURI = "ipfs://Qmd1b3MJedpQ7XpnBrtLEaXvzSXHPWqNeqG3Fz6iNrCAvi"
const fluctuaWebsite = "https://fluctuarecords.com"

describe("RumiaNFT", function () {
  it("Should return a token id after mint", async function () {

    const NFT = await ethers.getContractFactory("RumiaNFT");
    const nft = await NFT.deploy();
    await nft.deployed();

    const owner = await nft.owner()

    const [first_account] = await ethers.getSigners();

    expect(owner).to.equal(first_account.address);

    const singleMintTx = await nft.safeMint(owner, ipfsTestURI);

    // wait until the transaction is mined
    await singleMintTx.wait();

    expect(await nft.tokenURI(0)).to.equal(ipfsTestURI);
  });

  it("Should mint nfts in batch", async function () {
    const NFT = await ethers.getContractFactory("RumiaNFT");
    const nft = await NFT.deploy();
    await nft.deployed();

    const [first_account] = await ethers.getSigners();

    const batchMintTx = await nft.safeMintBatch(
      first_account.address, [ipfsTestURI, fluctuaWebsite]
    )

    // wait until the transaction is mined
    await batchMintTx.wait();

    expect(await nft.tokenURI(0)).to.equal(ipfsTestURI);
    expect(await nft.tokenURI(1)).to.equal(fluctuaWebsite);
  })
});
