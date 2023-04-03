import { configureChains, createClient } from 'wagmi'
import { goerli, sepolia, mainnet } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy'
import { infuraProvider } from 'wagmi/providers/infura'
import { providers } from 'ethers'


const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, ...(process.env.NODE_ENV === 'development' ? [sepolia] : [])],
  [
    infuraProvider({ apiKey: '2b221935e814478890e7dfd1728054ee' }),
  ],
)
// https://sepolia.infura.io/v3/2b221935e814478890e7dfd1728054ee
export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider: new providers.InfuraProvider('sepolia', '2b221935e814478890e7dfd1728054ee'),
  webSocketProvider,
})
