import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  /**
   * These 2 farms (PID 0, 1) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'CHARM',
    lpAddresses: {
      40: '0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df',
    },
    token: tokens.xcharm,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 1,
    lpSymbol: 'CHARM-TLOS LP',
    lpAddresses: {
      40: '0x933F83735f26e51c61955b4fCA88F13fbd423A0C',
    },
    token: tokens.cake,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 2,
    lpSymbol: 'TLOS-USDC LP',
    lpAddresses: {
      40: '0x651Fcc98a348C91FDF087903c25A638a25344dFf',
    },
    token: tokens.usdc,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 3,
    lpSymbol: 'TLOS-ETH LP',
    lpAddresses: {
      40: '0xd0D08c23d0cFd88457cDD43CaF34c16E3A29e85F',
    },
    token: tokens.eth,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 4,
    lpSymbol: 'wBTC-TLOS LP',
    lpAddresses: {
      40: '0x427E9A7bb848444a72faA3248c48F3B302429725', 
    },
    token: tokens.wbtc,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 5,
    lpSymbol: 'TLOS-DOUGE LP',
    lpAddresses: {
      40: '0xE320E5c4260c7186Fdb0Ea782A3C802736da743F',
    },
    token: tokens.dougecoin,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 6,
    lpSymbol: 'DOUGE-CHARM LP',
    lpAddresses: {
      40: '0x01623ebcBB1109E968e20570d2d41E61cf86F6d0',
    },
    token: tokens.dougecoin,
    quoteToken: tokens.cake,
  },
  {
    pid: 7,
    lpSymbol: 'CHARM-USDC LP',
    lpAddresses: {
      40: '0xbB4555efb784cD30fC27531EEd82f7BC097D6206',
    },
    token: tokens.usdc,
    quoteToken: tokens.cake,
  },
  {
    pid: 10,
    lpSymbol: 'USDC-USDT LP',
    lpAddresses: {
      40: '0x8805F519663E47aBd6adbA4303639f69e51fd112',
    },
    token: tokens.usdt,
    quoteToken: tokens.usdc,
  },
  {
    pid: 8,
    lpSymbol: 'TEAM-DOUGE LP',
    lpAddresses: {
      40: '0xBBea2A732211C9b483684Aa5c98a71C51295eA86',
    },
    token: tokens.cake,
    quoteToken: tokens.dougecoin,
  },
  {
    pid: 9,
    lpSymbol: 'TREASURY-TEAM LP',
    lpAddresses: {
      40: '0x389A833f83aAF096C6D3a550624C26151AaddcDC',
    },
    token: tokens.cake,
    quoteToken: tokens.dougecoin,
  },
  {
    pid: 11,
    lpSymbol: 'CHARM-ETH LP',
    lpAddresses: {
      40: '0xE2dE6566717fF3b1b1e988353E1f63dA0BD9E6f8',
    },
    token: tokens.eth,
    quoteToken: tokens.cake,
  },
  {
    pid: 12,
    lpSymbol: 'ELK-TLOS LP',
    lpAddresses: {
      40: '0x63276BDab3443993adc45Eed3C6105B07338D648',
    },
    token: tokens.elk,
    quoteToken: tokens.wtlos,
  },
  {
    pid: 14,
    lpSymbol: 'BURN-CHARM LP',
    lpAddresses: {
      40: '0x4942fc8b88dF31349d384Bb24455C1Ba42c5B1d7',
    },
    token: tokens.eth,
    quoteToken: tokens.cake,
  },
  {
    pid: 15,
    lpSymbol: 'BNB-TLOS LP',
    lpAddresses: {
      40: '0x72801E883EBF8548D0bF9BcF149DF72D84542448',
    },
    token: tokens.bnb,
    quoteToken: tokens.wtlos,
  }
    ,  
  {
    pid: 17,
    lpSymbol: 'AVAX-CHARM LP',
    lpAddresses: {
      40: '0xb812270599DB74d066578Bd940A95728bFc6988B',
    },
    token: tokens.avax,
    quoteToken: tokens.cake,
  }
  ,
  {
    pid: 9,
    lpSymbol: 'TREASURY-TEAM LP',
    lpAddresses: {
      40: '0x389A833f83aAF096C6D3a550624C26151AaddcDC',
    },
    token: tokens.cake,
    quoteToken: tokens.dougecoin,
  }
  
]

export default farms
