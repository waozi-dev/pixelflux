import { BrowserProvider, JsonRpcProvider } from 'ethers';

import Pixelflux1JSON from '../../build/contracts/Pixelflux1.json';
import Pixelflux2JSON from '../../build/contracts/Pixelflux2.json';
import Pixelflux3JSON from '../../build/contracts/Pixelflux3.json';

require('dotenv').config();

const getBrowserProvider = (): BrowserProvider | null => {
  if (!window.ethereum) {
    console.error('MetaMask or a similar wallet provider is required.');
    return null;
  }
  return new BrowserProvider(window.ethereum);
}

const getInfuraProvider = (): JsonRpcProvider | null => {
  const infuraUrl = `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;
  if (!process.env.INFURA_API_KEY) {
    console.error('Infura API key is required.');
    return null;
  }
  return new JsonRpcProvider(infuraUrl);
}

const getAnkrProvider = (): JsonRpcProvider | null => {
  const ankrUrl = `https://rpc.ankr.com/polygon/${process.env.ANKR_API_KEY}`;
  if (!process.env.ANKR_API_KEY) {
    console.error('Ankr API key is required.');
    return null;
  }
  return new JsonRpcProvider(ankrUrl);
};


const getProvider = async (): Promise<BrowserProvider | JsonRpcProvider | null> => {
  let provider: BrowserProvider | JsonRpcProvider | null = getBrowserProvider();
  if (provider) {
    try {
      // Attempt to get the network as a test to see if the provider works
      await provider.getNetwork();
      return provider;
    } catch (error) {
      console.error('BrowserProvider not supported:', error);
    }
  }

  provider = getInfuraProvider();
  if (provider) {
    try {
      // Attempt to get the network as a test to see if the provider works
      await provider.getNetwork();
      return provider;
    } catch (error) {
      console.error('InfuraProvider not supported:', error);
    }
  }

  provider = getAnkrProvider();
  if (provider) {
    try {
      // Attempt to get the network as a test to see if the provider works
      await provider.getNetwork();
      return provider;
    } catch (error) {
      console.error('AnkrProvider not supported:', error);
    }
  }

  return null;
};

 
const contractABIs = [Pixelflux1JSON.abi, Pixelflux2JSON.abi, Pixelflux3JSON.abi];


export {contractABIs, getProvider, getBrowserProvider, getAnkrProvider }