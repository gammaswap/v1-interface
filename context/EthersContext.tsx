import { createContext } from 'react';
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers"

export interface IEthersContext {
  provider: JsonRpcProvider | null
  setProvider: (provider: JsonRpcProvider) => void
  signer: JsonRpcSigner | null
  setSigner: (signer: JsonRpcSigner) => void
}

export const EthersContext = createContext<IEthersContext | null>(null);