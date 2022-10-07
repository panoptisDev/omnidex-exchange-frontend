import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    41: '0xd2504a02fABd7E546e41aD39597c377cA8B0E1Df',
  }

  it(`get address for mainnet (chainId 40)`, () => {
    process.env.REACT_APP_CHAIN_ID = '40'
    const expected = address[40]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.REACT_APP_CHAIN_ID = '31337'
    const expected = address[40]
    expect(getAddress(address)).toEqual(expected)
  })
})
