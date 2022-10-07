import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.cake,
    earningToken: tokens.cake,
    contractAddress: {
      40: '0x79f5A8BD0d6a00A41EA62cdA426CEf0115117a61',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '2',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 1,
    stakingToken: tokens.cake,
    earningToken: tokens.dougecoin,
     contractAddress: {
       40: '0x2416e0d9486b653836e5880b42390b2f22a71630', // TODO: Replace temp address with a normal one.
     },
     poolCategory: PoolCategory.TELOS,
     harvest: true,
     tokenPerBlock: '2',
     sortOrder: 999,
     isFinished: false,
   },
  // {
  //   sousId: 2,
  //   stakingToken: tokens.cake,
  //   earningToken: tokens.tlos,
  //   contractAddress: {
  //     41: '0x0000000000000000000000000000000000000019', // TODO: Replace temp address with a normal one.
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '0.0041',
  //   sortOrder: 999,
  //   isFinished: false,
  // },
]

export default pools
