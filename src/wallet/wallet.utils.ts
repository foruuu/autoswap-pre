import BN from 'bignumber.js';
import { wallet } from './index';
import { KuswapContract } from '../contract';
import { KUSWAP_CONFIG } from '../config/kuswap.config';
import { getKusPrice } from '../utils';

const _generateSwapInputData = (
  amount: string,
  slippage: number,
  price: string
) => {
  const amountHex = new BN(amount).toString(16).padStart(64, '0');
  const amountInMaxHex = new BN(amount)
    .multipliedBy(price)
    .multipliedBy(1 - slippage)
    .toString(16)
    .padStart(64, '0');

  const addressPlaceHolderHex =
    '00000000000000000000000000000000000000000000000000000000000000a0';
  const headlineHex = new BN(new Date().getTime().toString().substr(0, 10))
    .plus(24 * 3600)
    .toString()
    .padStart(64, '0');
  const addressHex = wallet.address.slice(2).padStart(64, '0');
  const sourceTokenHex = KUSWAP_CONFIG.TOKEN.KUS.padStart(64, '0');
  const targetTokenHex = KUSWAP_CONFIG.TOKEN.USDT.padStart(64, '0');
  const lengthHex =
    '0000000000000000000000000000000000000000000000000000000000000002';
  return `${KUSWAP_CONFIG.methods.swapExactTokensForTokens}${amountHex}${amountInMaxHex}${addressPlaceHolderHex}${addressHex}${headlineHex}${lengthHex}${sourceTokenHex}${targetTokenHex}`;
};

class WalletUtils {
  static swapKus2USDT = async (amount, slippage) => {
    console.log('start swapKus2USDT...');
    const kusPrice = await getKusPrice();
    if (kusPrice.status === 0) {
      console.log(kusPrice.price);
      return;
    }
    const inputDate = _generateSwapInputData(amount, slippage, kusPrice.price);
    try {
      const res = await wallet.sendTransaction({
        from: wallet.address,
        to: KUSWAP_CONFIG.ROUTERV2,
        value: '0x0',
        gasLimit: `0x${new BN(300000).toString(16)}`,
        gasPrice: await wallet.getGasPrice(),
        data: inputDate,
      });
      console.log('transfer success', res);
    } catch (e) {
      console.log('e', e);
    }
  };

  static async getLPToken(PairIndex, address) {
    console.log('start to get LpToekn...');
    const contract = KuswapContract.getFarmContract(wallet.provider);
    const res = await contract.functions.userInfo(PairIndex, address);
    console.log('LpToekn...', res.amount.toString());
    return res.amount.toString();
  }

  static withdrawLPToken = async (id) => {
    console.log('start withdraw LPtoken..');
    const lpTokenAmount = await WalletUtils.getLPToken(id, wallet.address);
    const poolIndexHex =
      '0000000000000000000000000000000000000000000000000000000000000001';
    const amountHex = new BN(lpTokenAmount).toString(16).padStart(64, '0');
    const inputData = `${KUSWAP_CONFIG.methods.withdrawFram}${poolIndexHex}${amountHex}`;
    try {
      wallet.sendTransaction({
        from: wallet.address,
        to: KUSWAP_CONFIG.FARM,
        value: '0x0',
        gasLimit: `0x${new BN(200000).toString(16)}`,
        gasPrice: await wallet.getGasPrice(),
        data: inputData,
      });
      console.log('Withdraw LPToken Success!');
    } catch (e) {
      console.log('Failed', e);
    }
  };

  static getUnHaverstKus = async (poolIndex, address) => {
    console.log('start getpending kus...');
    const contract = KuswapContract.getFarmContract(wallet.provider);
    const res = await contract.functions.pendingKUS(poolIndex, address);
    console.log('pending kus amount', res.toString());
    return res;
  };
}

export { WalletUtils };
