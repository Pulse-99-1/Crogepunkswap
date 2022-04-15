import { ChainId, JSBI, Percent, Token, WETH } from '@photonswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected, defiWalletConnect } from '../connectors'

export const ROUTER_ADDRESSES: { [key: string]: string } = {
  [ChainId.CRONOSTEST]: '0x2fFAa0794bf59cA14F268A7511cB6565D55ed40b',
  [ChainId.CRONOSMAINNET]: '0x69004509291F4a4021fA169FafdCFc2d92aD02Aa',
  [ChainId.CASSINI]: '0xbb5ce818AB3afB02d60914e2D1c684B5Df0bA07d',
  [ChainId.BSC_TEST_NET]: '0xbb5ce818AB3afB02d60914e2D1c684B5Df0bA07d',
  [ChainId.MUMBAI_TESTNET]: '0xbb5ce818AB3afB02d60914e2D1c684B5Df0bA07d',
  [ChainId.EVMOS_TESTNET]: "0x2fe85a78476f8B6d54aA6e1e0598Ba8b82619551",
  [ChainId.KAVA_TESTNET]: "0x4FD2c40c25Dd40e9Bf0CE8479bA384178b8671b5"
}
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const LAIR_ADDRESS = '0xEF08C4323a24B3F2ACE76C75cD6249E3e36C70ff';

export const QUICK_ADDRESS = '0x831753DD7087CaC61aB5644b308642cc1c33Dc13';
export const PHOTON_SWAP_VERSION = "v1.0.24"

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

//export const DAI = new Token(ChainId.CASSINI, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(ChainId.CRONOSMAINNET, '0xc21223249ca28397b4b6541dffaecc539bff0c59', 6, 'USDC', 'USD//C'),
  [ChainId.CRONOSTEST]: new Token(ChainId.CRONOSTEST, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C'),
  [ChainId.CASSINI]: new Token(ChainId.CASSINI, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C'),
  [ChainId.BSC_TEST_NET]: new Token(ChainId.BSC_TEST_NET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C'),
  [ChainId.MUMBAI_TESTNET]: new Token(ChainId.MUMBAI_TESTNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C'),
  [ChainId.EVMOS_TESTNET]: new Token(ChainId.EVMOS_TESTNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C'),
  [ChainId.KAVA_TESTNET]: new Token(ChainId.KAVA_TESTNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C'),
}
export const USDT: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(ChainId.CRONOSMAINNET, '0x66e428c3f67a68878562e79A0234c1F83c208770', 6, 'USDT', 'Tether USD'),
  [ChainId.CRONOSTEST]: new Token(ChainId.CRONOSTEST, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
  [ChainId.CASSINI]: new Token(ChainId.CASSINI, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
  [ChainId.BSC_TEST_NET]: new Token(ChainId.BSC_TEST_NET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
  [ChainId.MUMBAI_TESTNET]: new Token(ChainId.MUMBAI_TESTNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
  [ChainId.EVMOS_TESTNET]: new Token(ChainId.EVMOS_TESTNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
  [ChainId.KAVA_TESTNET]: new Token(ChainId.KAVA_TESTNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),

}
//export const COMP = new Token(ChainId.CASSINI, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
//export const MKR = new Token(ChainId.CASSINI, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.CASSINI, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
//export const WBTC = new Token(ChainId.CASSINI, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 18, 'WBTC', 'Wrapped BTC')
export const GAMMA: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(ChainId.CRONOSMAINNET, '0xEF08C4323a24B3F2ACE76C75cD6249E3e36C70ff', 18, 'D11', 'DeFi11'),
  [ChainId.MUMBAI_TESTNET]: new Token(ChainId.CRONOSMAINNET, '0xEF08C4323a24B3F2ACE76C75cD6249E3e36C70ff', 18, 'D11', 'DeFi11'),
  [ChainId.CRONOSTEST]: new Token(ChainId.CRONOSTEST, '0xEF08C4323a24B3F2ACE76C75cD6249E3e36C70ff', 18, 'D11', 'DeFi11'),
  [ChainId.CASSINI]: new Token(ChainId.CASSINI, '0xc58158c14D4757EF36Ce25e493758F2fcEEDec5D', 18, 'D11', 'DeFi11'),
  [ChainId.BSC_TEST_NET]: new Token(ChainId.CASSINI, '0xc58158c14D4757EF36Ce25e493758F2fcEEDec5D', 18, 'D11', 'DeFi11'),
  [ChainId.EVMOS_TESTNET]: new Token(ChainId.EVMOS_TESTNET, '0xc58158c14D4757EF36Ce25e493758F2fcEEDec5D', 18, 'D11', 'DeFi11'),
  [ChainId.KAVA_TESTNET]: new Token(ChainId.KAVA_TESTNET, '0xc58158c14D4757EF36Ce25e493758F2fcEEDec5D', 18, 'D11', 'DeFi11')
}
export const ETHER = new Token(ChainId.CASSINI, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, 'ETH', 'Ether')



export const ELK: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(ChainId.CRONOSMAINNET, '0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C', 18, 'Elk', 'Elk'),
  [ChainId.MUMBAI_TESTNET]: new Token(ChainId.MUMBAI_TESTNET, '0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C', 18, 'Elk', 'Elk'),

  [ChainId.CRONOSTEST]: new Token(ChainId.CRONOSTEST, '0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C', 18, 'Elk', 'Elk'),
  [ChainId.CASSINI]: new Token(ChainId.CASSINI, '0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C', 18, 'Elk', 'Elk'),
  [ChainId.BSC_TEST_NET]: new Token(ChainId.BSC_TEST_NET, '0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C', 18, 'Elk', 'Elk'),
  [ChainId.EVMOS_TESTNET]: new Token(ChainId.EVMOS_TESTNET, '0xe95fD76CF16008c12FF3b3a937CB16Cd9Cc20284', 18, 'Elk', 'Elk'),
  [ChainId.KAVA_TESTNET]: new Token(ChainId.KAVA_TESTNET, '0xe95fD76CF16008c12FF3b3a937CB16Cd9Cc20284', 18, 'Elk', 'Elk'),
}


export const ICY: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(ChainId.CRONOSMAINNET, '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.MUMBAI_TESTNET]: new Token(ChainId.MUMBAI_TESTNET, '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.CRONOSTEST]: new Token(ChainId.CRONOSTEST, '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.CASSINI]: new Token(ChainId.CASSINI, '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.BSC_TEST_NET]: new Token(ChainId.BSC_TEST_NET, '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.EVMOS_TESTNET]: new Token(ChainId.EVMOS_TESTNET, '0xe95fD76CF16008c12FF3b3a937CB16Cd9Cc20284', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.KAVA_TESTNET]: new Token(ChainId.KAVA_TESTNET, '0xe95fD76CF16008c12FF3b3a937CB16Cd9Cc20284', 18, 'IcyCRO', 'IcyCRO'),
}

export const ESSO: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(ChainId.CRONOSMAINNET, '0xc82eA25896F065cB6E3ae298cD1f23FE58516A35', 8, 'ESSO', 'ESSO'),
  [ChainId.MUMBAI_TESTNET]: new Token(ChainId.MUMBAI_TESTNET, '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.CRONOSTEST]: new Token(ChainId.CRONOSTEST, '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.CASSINI]: new Token(ChainId.CASSINI, '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.BSC_TEST_NET]: new Token(ChainId.BSC_TEST_NET, '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C', 18, 'IcyCRO', 'IcyCRO'),
  [ChainId.EVMOS_TESTNET]: new Token(ChainId.EVMOS_TESTNET, '0xe95fD76CF16008c12FF3b3a937CB16Cd9Cc20284', 18, 'PERA', 'PERA'),
  [ChainId.KAVA_TESTNET]: new Token(ChainId.KAVA_TESTNET, '0xe95fD76CF16008c12FF3b3a937CB16Cd9Cc20284', 18, 'ESSO', 'ESSO'),
}

// TODO this is only approximate, it's actually based on blocks
export const PROPOSAL_LENGTH_IN_DAYS = 7

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'

export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.CRONOSMAINNET]: new Token(ChainId.CRONOSMAINNET, '0xbdd4e5660839a088573191A9889A262c0Efc0983', 18, 'PHOTON', 'PhotonSwap'),
  [ChainId.CRONOSTEST]: new Token(ChainId.CRONOSTEST, '0xCea2b0c503ae691c8AAeC0431E9C0431Ce096Da6', 18, 'PHOTON', 'PhotonSwap'),
  [ChainId.BSC_TEST_NET]: new Token(ChainId.BSC_TEST_NET, '0x7a9F89bcef3840eccC218293aEd7B1317CF077c9', 18, 'PHOTON', 'PhotonSwap'),
  [ChainId.CASSINI]: new Token(ChainId.CASSINI, '0x7a9F89bcef3840eccC218293aEd7B1317CF077c9', 18, 'PHOTON', 'PhotonSwap'),
  [ChainId.MUMBAI_TESTNET]: new Token(ChainId.MUMBAI_TESTNET, '0x7a9F89bcef3840eccC218293aEd7B1317CF077c9', 18, 'PHOTON', 'PhotonSwap'),
  [ChainId.EVMOS_TESTNET]: new Token(ChainId.EVMOS_TESTNET, '0x091267bc63B3d00ea8Db5A2831A289c5d882128c', 18, 'PHOTON', 'PhotonSwap'),
  [ChainId.KAVA_TESTNET]: new Token(ChainId.KAVA_TESTNET, '0xA8eFf8BB28c6193CBE8BcFb8276e9b1dD3380B13', 18, 'PHOTON', 'PhotonSwap')
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.CRONOSTEST]: '0x090D4613473dEE047c3f2706764f49E0821D256e'
}

export const WETH_ONLY: ChainTokenList = {
  [ChainId.CRONOSMAINNET]: [WETH[ChainId.CRONOSMAINNET]],
  [ChainId.CRONOSTEST]: [WETH[ChainId.CRONOSTEST]],
  [ChainId.BSC_TEST_NET]: [WETH[ChainId.BSC_TEST_NET]],
  [ChainId.CASSINI]: [WETH[ChainId.CASSINI]],
  [ChainId.MUMBAI_TESTNET]: [WETH[ChainId.MUMBAI_TESTNET]],
  [ChainId.EVMOS_TESTNET]: [WETH[ChainId.EVMOS_TESTNET]],
  [ChainId.KAVA_TESTNET]: [WETH[ChainId.KAVA_TESTNET]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.CRONOSMAINNET]: [...WETH_ONLY[ChainId.CRONOSMAINNET]],
  [ChainId.CRONOSTEST]: [...WETH_ONLY[ChainId.CRONOSTEST]],
  [ChainId.CASSINI]: [...WETH_ONLY[ChainId.CASSINI]],
  [ChainId.MUMBAI_TESTNET]: [...WETH_ONLY[ChainId.MUMBAI_TESTNET]],
  [ChainId.BSC_TEST_NET]: [...WETH_ONLY[ChainId.BSC_TEST_NET]],
  [ChainId.KAVA_TESTNET]: [...WETH_ONLY[ChainId.KAVA_TESTNET]]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.CRONOSMAINNET]: {
    [AMPL.address]: [USDC[ChainId.CRONOSMAINNET], WETH[ChainId.CRONOSMAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.CRONOSMAINNET]: [...WETH_ONLY[ChainId.CRONOSMAINNET], USDT[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
  [ChainId.CASSINI]: [...WETH_ONLY[ChainId.CASSINI], USDT[ChainId.CASSINI]],
  [ChainId.MUMBAI_TESTNET]: [...WETH_ONLY[ChainId.MUMBAI_TESTNET], USDT[ChainId.MUMBAI_TESTNET]],
  [ChainId.BSC_TEST_NET]: [...WETH_ONLY[ChainId.BSC_TEST_NET], USDT[ChainId.BSC_TEST_NET]],
  [ChainId.KAVA_TESTNET]: [...WETH_ONLY[ChainId.KAVA_TESTNET], USDT[ChainId.KAVA_TESTNET]],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.CRONOSMAINNET]: [...WETH_ONLY[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
  [ChainId.CRONOSTEST]: [...WETH_ONLY[ChainId.CRONOSTEST], UNI[ChainId.CRONOSTEST]],
  [ChainId.CASSINI]: [...WETH_ONLY[ChainId.CASSINI], UNI[ChainId.CASSINI]],
  [ChainId.BSC_TEST_NET]: [...WETH_ONLY[ChainId.BSC_TEST_NET], UNI[ChainId.BSC_TEST_NET]],
  [ChainId.MUMBAI_TESTNET]: [...WETH_ONLY[ChainId.MUMBAI_TESTNET], UNI[ChainId.MUMBAI_TESTNET]],
  [ChainId.KAVA_TESTNET]: [...WETH_ONLY[ChainId.KAVA_TESTNET], UNI[ChainId.KAVA_TESTNET]]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.CRONOSMAINNET]: [
    [WETH[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]]
  ],
  [ChainId.CRONOSTEST]: [
    [WETH[ChainId.CRONOSTEST], UNI[ChainId.CRONOSTEST]]
  ], [ChainId.BSC_TEST_NET]: [
    [WETH[ChainId.BSC_TEST_NET], UNI[ChainId.BSC_TEST_NET]]
  ], [ChainId.CASSINI]: [
    [WETH[ChainId.CASSINI], UNI[ChainId.CASSINI]],
  ], [ChainId.MUMBAI_TESTNET]: [
    [WETH[ChainId.MUMBAI_TESTNET], UNI[ChainId.MUMBAI_TESTNET]],
  ], [ChainId.KAVA_TESTNET]: [
    [WETH[ChainId.KAVA_TESTNET], UNI[ChainId.KAVA_TESTNET]],
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  DEFI_WALLET: {
    connector: defiWalletConnect,
    name: 'DeFi Wallet',
    iconName: 'cro.png',
    description: 'Login using DeFi wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
}
// const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
//   [ChainId.CRONOSTEST]: 'Cronos',
//   [ChainId.BSC_TEST_NET]: 'Binance Smart Chain',
// }

export const CHAIN_NAME: { [chainId in ChainId]: string } = {
  [ChainId.CRONOSMAINNET]: "Cronos",
  [ChainId.CRONOSTEST]: "Cronos (Testnet)",
  [ChainId.BSC_TEST_NET]: "BSC (Testnet)",
  [ChainId.CASSINI]: "Cassini",
  [ChainId.MUMBAI_TESTNET]: "Mumbai(Matic)",
  [ChainId.EVMOS_TESTNET]: "EVMOS (Testnet)",
  [ChainId.KAVA_TESTNET]: "KAVA (Testnet)"
}

export const CHAIN_SYMBOL: { [chainId in ChainId]: string } = {
  [ChainId.CRONOSMAINNET]: "CRO",
  [ChainId.CRONOSTEST]: "CRO",
  [ChainId.BSC_TEST_NET]: "BNB",
  [ChainId.CASSINI]: "CRO",
  [ChainId.MUMBAI_TESTNET]: "MATIC",
  [ChainId.EVMOS_TESTNET]: "EVMOS",
  [ChainId.KAVA_TESTNET]: "KAVA"
}

export const CHAIN_W_SYMBOL: { [chainId in ChainId]: string } = {
  [ChainId.CRONOSMAINNET]: "wCRO",
  [ChainId.CRONOSTEST]: "wCRO",
  [ChainId.CASSINI]: "wCRO",
  [ChainId.BSC_TEST_NET]: "wBNB",
  [ChainId.MUMBAI_TESTNET]: "wMATIC",
  [ChainId.EVMOS_TESTNET]: "wEVMOS",
  [ChainId.KAVA_TESTNET]: "wKAVA"
}

export const CHAIN_EXPOLRER: { [chainId in ChainId]: string } = {
  [ChainId.CRONOSMAINNET]: "https://cronoscan.com",
  [ChainId.CRONOSTEST]: "https://cronos-explorer.crypto.org",
  [ChainId.CASSINI]: "https://cronos.crypto.org/cassini/explorer",
  [ChainId.BSC_TEST_NET]: "https://testnet.bscscan.com",
  [ChainId.MUMBAI_TESTNET]: "https://mumbai.polygonscan.com",
  [ChainId.EVMOS_TESTNET]: "https://blockscout.evmos.org",
  [ChainId.KAVA_TESTNET]: "https://explorer.evm-alpha.kava.io"
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))
