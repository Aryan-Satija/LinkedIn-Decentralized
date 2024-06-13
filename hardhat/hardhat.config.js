require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://eth-sepolia.g.alchemy.com/v2/jFujZdIypdrXcSrXXytE9b6IsQDID4iw",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
