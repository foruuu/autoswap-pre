import { ethers } from 'ethers';
import { WalletConfig, KCC } from '../config';

/**
 * init wallet
 */

const provider = new ethers.providers.JsonRpcProvider(KCC.rpc, {
  name: KCC.name,
  chainId: KCC.chain_id,
});

const wallet = new ethers.Wallet(WalletConfig.privateKey, provider);

export { wallet };
