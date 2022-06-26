require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/z98mLV1lNii3jXzRGTzVTNZ9RZKrO73R',
      accounts: ['066671909e5135fde9b8a825b56ac06688e143ca538dc351bc92ebf6823fa3f1'],
    }
  }
}