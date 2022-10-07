import { ChainId, Token } from '../../sdk'

export const CHARM: { [chainId: number]: Token } = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df',
    18,
    'CHARM',
    'OmniDex Token',
  ),
}

export const WTLOS = new Token(
  ChainId.MAINNET,
  '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
  18,
  'WTLOS',
  'Wrapped TLOS',
)
export const DOUGE = new Token(ChainId.MAINNET, '0xc6BC7A8dfA0f57Fe7746Ac434c01cD39679b372c', 18, 'Dougecoin', 'DOUGE')
export const USDC = new Token(ChainId.MAINNET, '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b', 6, 'USDC', 'USDC')
export const WBTC = new Token(ChainId.MAINNET, '0xf390830df829cf22c53c8840554b98eafc5dcbc2', 8, 'WBTC', 'WBTC')
export const ETH = new Token(ChainId.MAINNET, '0xfa9343c3897324496a05fc75abed6bac29f8a40f', 18, 'ETH', 'ETH')
export const USDT = new Token(ChainId.MAINNET, '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73', 6, 'USDT', 'USDT')
export const ELK = new Token(ChainId.MAINNET, '0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C', 18, 'ELK', 'ELK')
export const BNB = new Token(ChainId.MAINNET, '0x2c78f1b70ccf63cdee49f9233e9faa99d43aa07e', 18, 'BNB', 'BNB')
export const FTM = new Token(ChainId.MAINNET, '0xc1be9a4d5d45beeacae296a7bd5fadbfc14602c4', 18, 'FTM', 'FTM')
export const AVAX = new Token(ChainId.MAINNET, '0x7c598c96d02398d89fbcb9d41eab3df0c16f227d', 18, 'AVAX', 'AVAX')
export const MATIC = new Token(ChainId.MAINNET, '0x332730a4F6E03D9C55829435f10360E13cfA41Ff', 18, 'MATIC', 'MATIC')


const tokens = {
  tlos: {
    symbol: 'TLOS',
    projectLink: 'https://www.telos.net/',
  },
  cake: {
    symbol: 'CHARM',
    address: {
      40: '0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
  wtlos: {
    symbol: 'wTLOS',
    address: {
      40: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
  xcharm: {
    symbol: 'xCHARM',
    address: {
      40: '0x65a5f4636233B7B4c4B134BA414c6EaB9fF79594',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
  dougecoin: {
    symbol: 'DOUGE',
    address: {
      40: '0xc6BC7A8dfA0f57Fe7746Ac434c01cD39679b372c',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
  usdc: {
    symbol: 'USDC',
    address: {
      40: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
    },
    decimals: 6,
    projectLink: 'https://omnidex.finance/',
  },
  wbtc: {
    symbol: 'WBTC',
    address: {
      40: '0xf390830df829cf22c53c8840554b98eafc5dcbc2',
    },
    decimals: 8,
    projectLink: 'https://omnidex.finance/',
  },
  eth: {
    symbol: 'ETH',
    address: {
      40: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      40: '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
    },
    decimals: 6,
    projectLink: 'https://omnidex.finance/',
  },
  elk: {
    symbol: 'ELK',
    address: {
      40: '0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
  bnb: {
    symbol: 'BNB',
    address: {
      40: '0x2c78f1b70ccf63cdee49f9233e9faa99d43aa07e',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
  ftm: {
    symbol: 'FTM',
    address: {
      40: '0xc1be9a4d5d45beeacae296a7bd5fadbfc14602c4',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
  avax: {
    symbol: 'AVAX',
    address: {
      40: '0x7c598c96d02398d89fbcb9d41eab3df0c16f227d',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
  matic: {
    symbol: 'MATIC',
    address: {
      40: '0x332730a4F6E03D9C55829435f10360E13cfA41Ff',
    },
    decimals: 18,
    projectLink: 'https://omnidex.finance/',
  },
}

export default tokens


