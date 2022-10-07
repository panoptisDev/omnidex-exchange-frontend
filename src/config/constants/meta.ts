import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'OmniDex',
  description:
    'The most popular AMM on Telos by user count! Earn CHARM through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by OmniDex), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t('OmniDex')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('OmniDex')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('OmniDex')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('OmniDex')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('OmniDex')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('OmniDex')}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t('OmniDex')}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t('OmniDex')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('OmniDex')}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t('OmniDex')}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t('OmniDex')}`,
      }
    default:
      return null
  }
}
