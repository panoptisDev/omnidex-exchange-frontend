import { ChainId } from '../../sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: 'https://mainnet.telos.net/evm',
}

export default NETWORK_URLS
