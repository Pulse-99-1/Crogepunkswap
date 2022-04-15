import { ChainId } from "@photonswap/sdk"

export const DEFAULT_TOKEN_LIST_URL = 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-photonswap.json'

export const DEFAULT_LIST_OF_LISTS: string[] = [
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/mumbai-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/bsc-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/evmos-testnet-photonswap.json',
  'https://raw.githubusercontent.com/photonswap-finance/tokens/main/kava-testnet-photonswap.json',
]

export const DEFAULT_HARDCODED_TOKEN_LIST: { [chainId in ChainId]?: string } = {
  [ChainId.MUMBAI_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/mumbai-testnet-photonswap.json',
  [ChainId.CRONOSMAINNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-photonswap.json',
  [ChainId.CRONOSTEST]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/cronos-testnet-photonswap.json',
  [ChainId.BSC_TEST_NET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/bsc-testnet-photonswap.json',
  [ChainId.EVMOS_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/evmos-testnet-photonswap.json',
  [ChainId.KAVA_TESTNET]: 'https://raw.githubusercontent.com/photonswap-finance/tokens/main/kava-testnet-photonswap.json',
}
