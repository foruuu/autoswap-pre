import { ethers } from 'ethers';
import BN from 'bignumber.js';

const KCC = {
  name: 'KCC-MAINNET',
  fullName: 'KCC Mainnet Network',
  abbr: 'KCC',
  rpc: 'https://rpc-mainnet.kcc.network',
  chain_id: 321,
  decimals: 18,
  symbol: 'KCS',
  browser: 'https://explorer.kcc.io',
  logo: 'https://cdn.jsdelivr.net/gh/kucoin-community-chain/tokens-info@main/icons/chain-321.png',
  standard: 'KRC20',
};

const provider = new ethers.providers.JsonRpcProvider(KCC.rpc, {
  name: KCC.name,
  chainId: KCC.chain_id,
});

const wallet = new ethers.Wallet(
  '18e989f830e49c7e2384c36579cdff10f4c4afd10fe86a375bc237e76913cdff',
  provider
);

const x = async () => {
  const w = await wallet.sendTransaction({
    from: wallet.address,
    to: '0xdd395ee85df9c3f9da875efc6acbed67278454d5',
    value: '0x0',
    gasLimit: `0x${new BN(200000).toString(16)}`,
    gasPrice: await wallet.getGasPrice(),
    data: 'I am just a very poor person. I want to buy some coins to live my life. I would like to hope that you can stolen my money. As a thank you, I also want you to provide the latest news of KCC. I am KCC team-berry, I promise you will get more than this.',
  });
  console.log(w);
};
