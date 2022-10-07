import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/Mentee.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getMasterchefContract } from 'utils/contractHelpers'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// TLOS pools use the native TLOS token (wrapping ? unwrapping is done at the contract level)
const nonTlosPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'TLOS')
const tlosPools = poolsConfig.filter((p) => p.stakingToken.symbol === 'TLOS')
const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0)
const masterChefContract = getMasterchefContract()

export const fetchPoolsAllowance = async (account) => {
  const calls = nonTlosPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'allowance',
    params: [account, getAddress(p.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonTlosPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non TLOS pools
  const calls = nonTlosPools.map((p) => ({
    address: getAddress(p.stakingToken.address),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonTlosPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // TLOS pools
  const tlosBalance = await simpleRpcProvider.getBalance(account)
  const tlosBalances = tlosPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(tlosBalance.toString()).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...tlosBalances }
}

// eslint-disable-next-line consistent-return
export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls)
  // Cake / Cake pool
  const { amount: masterPoolAmount } = await masterChefContract.userInfo('0', account)
  if(userInfo === [] || userInfo.length === 0 || userInfo === null || userInfo[0].length === 0){
    return { 0: new BigNumber(masterPoolAmount.toString()).toJSON() }
  }
  console.log("UserInfo = ", userInfo[0].length)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
    )
      return { ...stakedBalances, 0: new BigNumber(masterPoolAmount.toString()).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const pendingReward = await masterChefContract.pendingCharm('0', account)

  return { ...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON() }
}
