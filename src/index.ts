import BN from 'bignumber.js';
import { Contract } from 'ethers';
import { KuswapContract } from './contract';
import { Job } from './job';
import { getKusPrice } from './utils';
import { wallet } from './wallet';
import { WalletUtils } from './wallet/wallet.utils';

const autoWithdrawLpCondition = async () => {
  console.log('starting to run condition....');
  const priceResponse = await getKusPrice();
  if (priceResponse.status === 0) return false;
  if (new BN(priceResponse.price).lt(7)) {
    return true;
  }
  return false;
};

// JOB 1
const AutoWithDrawLpTokenAndRemoveLiquidity = new Job(
  'AutoWithDrawLpTokenAndRemoveLiquidity',
  autoWithdrawLpCondition,
  [WalletUtils.withdrawLPToken.bind(null, 1)],
  false,
  1000 * 10
);

/* const havest = (id: number) => {
  const contract = KuswapContract.getFarmContract();
  await contract.callStatic.
};

const AutoWithDrawLpToken = new Job(
  'AutoWithDrawLpToken',
  autoWithdrawLpCondition,
  [WalletUtils.withdrawLPToken.bind(null, 1)],
  false,
  1000 * 10
); */

const test = async () => {
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

test();

// AutoWithDrawLpTokenAndRemoveLiquidity.start();
