
import {
  BigintIsh,
  Currency,
  CurrencyAmount,
  currencyEquals,
  Pair,
  Percent,
  Token,
  TokenAmount,
  Trade,
  WETH
} from '@photonswap/sdk'
import { useMemo } from 'react'
import { useV1FactoryContract } from '../hooks/useContract'
import { Version } from '../hooks/useToggledVersion'
import { useSingleCallResult } from '../state/multicall/hooks'

export function useV1ExchangeAddress(tokenAddress?: string): string | undefined {
  const contract = useV1FactoryContract()

  const inputs = useMemo(() => [tokenAddress], [tokenAddress])
  return useSingleCallResult(contract, 'getExchange', inputs)?.result?.[0]
}

export class MockV1Pair extends Pair {
  constructor(etherAmount: BigintIsh, tokenAmount: TokenAmount) {
    super(tokenAmount, new TokenAmount(WETH[tokenAmount.token.chainId], etherAmount))
  }
}

// returns all v1 exchange addresses in the user's token list
export function useAllTokenV1Exchanges(): { [exchangeAddress: string]: Token } {
  return {}
}

// returns whether any of the tokens in the user's token list have liquidity on v1
export function useUserHasLiquidityInAllTokens(): boolean | undefined {
  return false
}

/**
 * Returns the trade to execute on V1 to go between input and output token
 */
export function useV1Trade(
  isExactIn?: boolean,
  inputCurrency?: Currency,
  outputCurrency?: Currency,
  exactAmount?: CurrencyAmount
): Trade | undefined {
  // get the mock v1 pairs
  // construct a direct or through ETH v1 route
  let v1Trade: Trade | undefined
  try {
    v1Trade = undefined
  } catch (error) {
    console.debug('Failed to create V1 trade', error)
  }
  return v1Trade
}

export function getTradeVersion(trade?: Trade): Version | undefined {
  return Version.v2
}

// returns the v1 exchange against which a trade should be executed
export function useV1TradeExchangeAddress(trade: Trade | undefined): string | undefined {
  const tokenAddress: string | undefined = useMemo(() => {
    if (!trade) return undefined
    const isV1 = getTradeVersion(trade) === Version.v1
    if (!isV1) return undefined
    return trade.inputAmount instanceof TokenAmount
      ? trade.inputAmount.token.address
      : trade.outputAmount instanceof TokenAmount
      ? trade.outputAmount.token.address
      : undefined
  }, [trade])
  return useV1ExchangeAddress(tokenAddress)
}

const ZERO_PERCENT = new Percent('0')
const ONE_HUNDRED_PERCENT = new Percent('1')

// returns whether tradeB is better than tradeA by at least a threshold percentage amount
export function isTradeBetter(
  tradeA: Trade | undefined,
  tradeB: Trade | undefined,
  minimumDelta: Percent = ZERO_PERCENT
): boolean | undefined {
  if (tradeA && !tradeB) return false
  if (tradeB && !tradeA) return true
  if (!tradeA || !tradeB) return undefined

  if (
    tradeA.tradeType !== tradeB.tradeType ||
    !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
    !currencyEquals(tradeB.outputAmount.currency, tradeB.outputAmount.currency)
  ) {
    throw new Error('Trades are not comparable')
  }

  if (minimumDelta.equalTo(ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice)
  } else {
    return tradeA.executionPrice.raw.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice)
  }
}
