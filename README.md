# Campaign App

## Description

Blockchain application to collect funds via campaign, full contract can be seen [here](https://rinkeby.etherscan.io/address/0x29be70b9377b687a83389c924a0dd8177dddaffd). Currently the contract is only available on rinkeby test network.

You can try application on the page https://divident.github.io/crowd-found/, only thing you need is a [metamask](https://metamask.io/) wallet.


## Build
If you want to run application on you local computer first you need compile contract
```
cd deploy && brownie compile
```

Then you need to install frontend dependencies and run application

```
npm install
npm run build
npm run server
```
