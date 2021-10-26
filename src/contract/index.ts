import { ethers } from 'ethers';
import { wallet } from 'src/wallet';
import { KUSWAP_CONFIG, KUSWAP_FARM_ABI, KUSWAP_ABI } from '../config';

class KuswapContract {
  static getFarmContract() {
    /*  this.contract = new Ethers.Contract(
      contract.address,
      contract.abi,
      new Ethers.Wallet(
        new Wallet({
          keystore: keystore,
          password: this.password,
        }).wallet.privateKey,
        contract.provider
      )
    ); */

    return new ethers.Contract(KUSWAP_CONFIG.FARM, KUSWAP_FARM_ABI, wallet);
  }

  static getRouter02Contract() {
    return new ethers.Contract(KUSWAP_CONFIG.ROUTERV2, KUSWAP_ABI, wallet);
  }
}

export { KuswapContract };
