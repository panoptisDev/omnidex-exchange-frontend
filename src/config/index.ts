import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'
import { ChainId } from '../sdk'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const TELOS_BLOCK_TIME = 0.5

export const BASE_TELOS_EXPLORER_URLS = {
  [ChainId.MAINNET]: 'https://www.teloscan.io',
}

// CAKE_PER_BLOCK details
// 40 CHARM is minted per block 
// 20 CHARM per block is sent to Burn pool (A farm just for burning cake)
// 10 CHARM per block goes to CHARM xcharm pool
// 9 CHARM per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeDataRow.tsx = 19 (40 - Amount sent to burn pool)

// CHARM STATS
// 6.14 CHARM is minted per block 
// 0 CHARM per block is sent to Burn pool (A farm just for burning cake)
// 2 CHARM per block goes to CHARM xcharm pool
// 4.14 CHARM per block goes to Yield farms and lottery
// CHARM_PER_BLOCK in config/index.ts = 6.14 as we only change the amount sent to the burn pool which is effectively a farm.
// CHARM/Block in src/views/Home/components/CakeDataRow.tsx = 6.14 (6.14 - Amount sent to burn pool)

export const CAKE_PER_BLOCK = new BigNumber(6.14)
export const BLOCKS_PER_YEAR = new BigNumber((60 / TELOS_BLOCK_TIME) * 60 * 24 * 365) // 63072000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR)
export const BASE_URL = 'https://omnidex.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_URL}/pool`
export const BASE_TELOS_EXPLORER_URL = BASE_TELOS_EXPLORER_URLS[ChainId.MAINNET]
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 670000000
export const DEFAULT_GAS_PRICE = 2
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
