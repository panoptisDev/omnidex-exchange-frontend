import { ChainId } from '../../../sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x74D01B798F0aEdc39548D3EA5fC922B291293b95',
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
