import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount, Pair } from '@photonswap/sdk'
import { useMemo, useEffect } from 'react'
import { UNI, GAMMA, USDC, ICY } from '../../constants'
import { STAKING_REWARDS_INTERFACE } from '../../constants/abis/staking-rewards'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData, useSingleCallResult } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'
import { useLairContract } from '../../hooks/useContract'
import { usePair } from '../../data/Reserves'
// import { client, healthClient } from '../../apollo/client'
// import {
//   GLOBAL_DATA,
//   SUBGRAPH_HEALTH
// } from '../../apollo/queries'
import useUSDCPrices from '../../utils/useUSDCPrice'

export const STAKING_GENESIS = 1644058800

export const REWARDS_DURATION_DAYS = 180

var oneDayVol: any = undefined;
// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    stakeId: number,
    rewardEnded: boolean,
    tokens: [Token, Token]
    stakingRewardAddress: string,
    extraMessage: string,
    rewardTokenName: string,
    rewardTokenAddress: string,
    rewardTokenSymbol: string,
    rewardTokenDecimals: number
  }[]
} = {
  [ChainId.CRONOSMAINNET]: [
    {
      stakeId: 1,
      rewardEnded: true,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [UNI[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xD5508C61381f4905e2b2d3694a982936F43650fE', 18, '', '')],
      stakingRewardAddress: '0xae68d2430601b52AD13c96E00E99D9218ccA6e17',
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },

    {
      stakeId: 2,
      rewardEnded: true,
      extraMessage: 'Please remove your Photons from this pool and move it to new pool.',
      tokens: [UNI[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xD5508C61381f4905e2b2d3694a982936F43650fE', 18, '', '')],
      stakingRewardAddress: '0xF6d8b6472446148e74FdE8cce76737CaB633fb09',
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      stakeId: 3,
      rewardEnded: true,
      extraMessage: 'Please remove your Photons from this pool as rewards are ended',
      tokens: [UNI[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xD5508C61381f4905e2b2d3694a982936F43650fE', 18, '', '')],
      stakingRewardAddress: '0x6Ce2F96A476e2F7a66B95DBdC1EAcAf04003f19c',
      rewardTokenAddress: '0xE1C110E1B1b4A1deD0cAf3E42BfBdbB7b5d7cE1C',
      rewardTokenName: 'Elk',
      rewardTokenSymbol: 'Elk',
      rewardTokenDecimals: 18,
    },
    {
      stakeId: 4,
      rewardEnded: true,
      extraMessage: 'Please remove your Photons from this pool and move it to new pool.',
      tokens: [UNI[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xD5508C61381f4905e2b2d3694a982936F43650fE', 18, '', '')],
      stakingRewardAddress: '0xc2BfA7031bf91E9300f127A7692A5ee7A92820aE',
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      stakeId: 5,
      rewardEnded: true,
      extraMessage: 'Please remove your Photons from this pool and move it to new pool.',
      tokens: [UNI[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xD5508C61381f4905e2b2d3694a982936F43650fE', 18, '', '')],
      stakingRewardAddress: '0xC94F051D8f238BF37bf32D4755333D415962b6a7',
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      stakeId: 6,
      rewardEnded: true,
      extraMessage: 'Reward Starts: 2022-02-05 11:00:00 UTC',
      tokens: [UNI[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xD5508C61381f4905e2b2d3694a982936F43650fE', 18, '', '')],
      stakingRewardAddress: '0xF2Dd8104a95a9Cfb97EAEda9E3FB4b1f0Ae5C179',
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      stakeId: 7,
      rewardEnded: false,
      extraMessage: 'Reward Starts: 2022-03-07 05:30:00 UTC',
      tokens: [UNI[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xD5508C61381f4905e2b2d3694a982936F43650fE', 18, '', '')],
      stakingRewardAddress: '0x55eAfb5bdAB747a2811bdb5Ba500BcBa4EF417bd',
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },

    {
      stakeId: 8,
      rewardEnded: false,
      extraMessage: 'Reward Starts: 2022-03-07 05:30:00 UTC',
      tokens: [ICY[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xD5508C61381f4905e2b2d3694a982936F43650fE', 18, '', '')],
      stakingRewardAddress: '0xEfDDE40B69d5dd05B7fc539207C0a014B8374117',
      rewardTokenAddress: ICY[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'ICY',
      rewardTokenSymbol: 'ICY',
      rewardTokenDecimals: 18,
    },

  ],
  [ChainId.CRONOSTEST]: [
    {
      stakeId: 1,
      rewardEnded: true,
      extraMessage: 'Rewards will be reduced once this pool ends.',
      tokens: [UNI[ChainId.CRONOSTEST], new Token(ChainId.CRONOSTEST, '0x4312fdf178764E17C88019cCbcfC9b5062Dd5533', 18, '', '')],
      stakingRewardAddress: '0x123A5e5497701bE4Ec9b8aB429a3BF7E91b278eb',
      rewardTokenAddress: '0x8F857Af6Ea31447Bb502fE0E3F4e4340CDFCfc6C',
      rewardTokenName: 'Elk',
      rewardTokenSymbol: 'Elk',
      rewardTokenDecimals: 18,
    }
  ]
}

export interface StakingInfo {
  stakeId: number,
  rewardEnded: boolean,
  // any extra info to display
  extraMessage: string
  // the address of the reward contract
  stakingRewardAddress: string
  // the tokens involved in this pair
  tokens: [Token, Token]
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount,
  //Reward Token
  rewardToken: Token,
  // when the period ends
  periodFinish: Date | undefined
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount
}

// gets the staking info from the network for the active chain id
export function useStakingInfo(pairToFilterBy?: Pair | null, tokenToFilterBy?: Token | null, stakeId?: number | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React()
  console.log('pairToFilterBy', pairToFilterBy)
  console.log('tokenToFilterBy', tokenToFilterBy?.address)
  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
          (pairToFilterBy === undefined
            ? true
            : pairToFilterBy === null
              ? tokenToFilterBy != null && tokenToFilterBy !== undefined ?
                (stakingRewardInfo.tokens[0].address === tokenToFilterBy.address)
                : []
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
              pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])) && (stakeId === undefined || stakeId === null ? true : stakingRewardInfo.stakeId === stakeId)
        ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )
  console.log(info)
  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])
  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')

  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )
  return useMemo(() => {

    if (!chainId || !uni) return []
    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const rewardToken = new Token(chainId, info[index].rewardTokenAddress, info[index].rewardTokenDecimals, info[index].rewardTokenSymbol, info[index].rewardTokenName);
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]
      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          return memo
        }

        // check for account, if no account set to 0
        const stakedAmount = new TokenAmount(info[index].tokens[0], JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(info[index].tokens[0], JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(rewardToken, JSBI.BigInt(rewardRateState.result?.[0]))

        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            rewardToken,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()
        console.log('memo push', info)
        memo.push({
          stakeId: info[index].stakeId,
          rewardEnded: info[index].rewardEnded,
          extraMessage: info[index].extraMessage,
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(rewardToken, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          rewardToken: rewardToken,
          getHypotheticalRewardRate
        })
      } else {
        console.log('else', info)
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardRates, rewardsAddresses, totalSupplies, uni])
}

export function useTotalUniEarned(): TokenAmount | undefined {
  const { chainId } = useActiveWeb3React()
  const uni = chainId ? UNI[chainId] : undefined
  const stakingInfos = useStakingInfo()

  return useMemo(() => {
    if (!uni) return undefined
    return (
      stakingInfos?.filter(stakingInfo => stakingInfo.rewardToken == uni).reduce(
        (accumulator, stakingInfo) => accumulator.add(stakingInfo.earnedAmount),
        new TokenAmount(uni, '0')
      ) ?? new TokenAmount(uni, '0')
    )
  }, [stakingInfos, uni])
}
// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}
// based on typed value
export function useDerivedUnstakeInfo(
  typedValue: string,
  stakingAmount: TokenAmount
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingAmount.token)

  const parsedAmount = parsedInput && JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw) ? parsedInput : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}


export interface SyrupInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the token involved in this staking
  token: Token
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount
  // the amount of token distributed per second to all stakers, constant
  totalRewardRate: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount
  // when the period ends
  periodFinish: Number

  ended: boolean

  name: string

  lp: string

  baseToken: Token

  quickPrice: Number

  rate: Number

  dQUICKtoQUICK: TokenAmount

  dQuickTotalSupply: TokenAmount

  oneDayVol: Number

  valueOfTotalStakedAmountInUSDC: Number


  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount
}

export function useSyrupInfo(tokenToFilterBy?: Token | null): SyrupInfo[] {
  const { chainId, account } = useActiveWeb3React()
  const safeChainId = chainId === undefined ? ChainId.CRONOSMAINNET : chainId
  //const [quickPrice,setQuickPrice] = useState(0);
  const [, quickUsdcPair] = usePair(UNI[safeChainId], USDC[safeChainId]);
  const quickPrice = Number(quickUsdcPair?.priceOf(UNI[safeChainId])?.toSignificant(6))
  const info = useMemo(
    () =>
      chainId
        ? SYRUP_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
          tokenToFilterBy === undefined
            ? true
            : tokenToFilterBy === null
              ? true
              : tokenToFilterBy.equals(stakingRewardInfo.token) &&
              tokenToFilterBy.equals(stakingRewardInfo.token)
        ) ?? []
        : [],
    [chainId, tokenToFilterBy]
  )

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])
  const lair = useLairContract()

  const inputs = ['1000000000000000000']
  const USDPrice = useUSDCPrices(UNI[safeChainId])


  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')
  const dQuickToQuick = useSingleCallResult(lair, 'dQUICKForQUICK', inputs);
  const _dQuickTotalSupply = useSingleCallResult(lair, 'totalSupply', []);

  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )

  useEffect(() => {

    getOneDayVolume().then((data) => {
      console.log(data);
    })
  }, [])

  return useMemo(() => {
    if (!chainId || !uni) return []
    const safeChainId = chainId === undefined ? ChainId.CRONOSMAINNET : chainId;
    return rewardsAddresses.reduce<SyrupInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      if (
        // these may be undefined if not logged in
        !dQuickToQuick?.loading &&
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading
      ) {
        if (
          dQuickToQuick?.error ||
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.error('Failed to load syrup rewards info')
          return memo
        }
        // get the LP token
        const token = info[index].token

        // check for account, if no account set to 0
        const lp = info[index].lp;
        // @ts-ignore
        const rate = web3.utils.toWei(info[index].rate.toString());
        const stakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : GAMMA[safeChainId], JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? new Token(137, lp, 18, "SLP", "Staked LP") : GAMMA[safeChainId], JSBI.BigInt(totalSupplyState.result?.[0]))
        const totalRewardRate = new TokenAmount(token, JSBI.BigInt(rate))
        //const pair = info[index].pair.toLowerCase();
        //@ts-ignore
        //const fees = (pairData && pairData[pair] ? pairData[pair].oneDayVolumeUSD * 0.0025: 0);
        const totalRewardRate01 = new TokenAmount(token, JSBI.BigInt(rewardRateState.result?.[0]))
        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            token,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate01.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate01)

        const periodFinishMs = info[index].ending
        const dQUICKtoQUICK = new TokenAmount(UNI[safeChainId], JSBI.BigInt(dQuickToQuick?.result?.[0] ?? 0))
        //@ts-ignore
        const valueOfTotalStakedAmountInUSDC = totalStakedAmount.toSignificant(6) * dQUICKtoQUICK.toSignificant(6) * USDPrice?.toSignificant(6)

        memo.push({
          stakingRewardAddress: rewardsAddress,
          token: info[index].token,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs,
          earnedAmount: new TokenAmount(token, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          getHypotheticalRewardRate,
          baseToken: info[index].baseToken,
          quickPrice: quickPrice,
          rate: info[index].rate,
          dQUICKtoQUICK: dQUICKtoQUICK,
          dQuickTotalSupply: new TokenAmount(GAMMA[safeChainId], JSBI.BigInt(_dQuickTotalSupply?.result?.[0] ?? 0)),
          valueOfTotalStakedAmountInUSDC: valueOfTotalStakedAmountInUSDC,
          oneDayVol: oneDayVol
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardsAddresses, totalSupplies, uni, dQuickToQuick, USDPrice, _dQuickTotalSupply, quickPrice, rewardRates])
}


const getOneDayVolume = async () => {
  let data: any = {}
  let oneDayData: any = {}

  ///TODO UNCOMMENT AND FIX


  // let healthInfo = await healthClient
  //   .query({
  //     query: SUBGRAPH_HEALTH,
  //   })
  // let current = Number(healthInfo.data.indexingStatusForCurrentVersion.chains[0].latestBlock.number)
  // const oneDayOldBlock = current - 45000;

  // let result = await client.query({
  //   query: GLOBAL_DATA(current),
  //   fetchPolicy: 'network-only',
  // })
  // data = result.data.uniswapFactories[0]

  // // fetch the historical data
  // let oneDayResult = await client.query({
  //   query: GLOBAL_DATA(oneDayOldBlock),
  //   fetchPolicy: 'network-only',
  // })
  oneDayData = "" //oneDayResult.data.uniswapFactories[0]

  let oneDayVolumeUSD: any = 0;

  if (data && oneDayData) {
    oneDayVolumeUSD = get2DayPercentChange(
      data.totalVolumeUSD,
      oneDayData.totalVolumeUSD ? oneDayData.totalVolumeUSD : 0)
    oneDayVol = oneDayVolumeUSD;
  }

  return oneDayVolumeUSD;

}

export const get2DayPercentChange = (valueNow: any, value24HoursAgo: any) => {
  // get volume info for both 24 hour periods
  let currentChange = parseFloat(valueNow) - parseFloat(value24HoursAgo)
  return currentChange
}
export function useDerivedSyrupInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

export interface LairInfo {
  lairAddress: string

  dQUICKtoQUICK: TokenAmount

  QUICKtodQUICK: TokenAmount

  dQUICKBalance: TokenAmount

  QUICKBalance: TokenAmount

  totalQuickBalance: TokenAmount

  quickPrice: Number

  dQuickTotalSupply: TokenAmount

  oneDayVol: Number
}


export const SYRUP_REWARDS_INFO: {
  [chainId in ChainId]?: {
    token: Token
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: Token
    rate: Number
    ending: Number //DATE IN UNIX TIMESTAMP
  }[]
} = {
  [ChainId.CRONOSTEST]: [
    {
      token: UNI[ChainId.CRONOSTEST],
      stakingRewardAddress: '0x123A5e5497701bE4Ec9b8aB429a3BF7E91b278eb',
      ended: false,
      lp: '',
      name: '',
      baseToken: UNI[ChainId.CRONOSTEST],
      rate: 3858,
      ending: 1642525260
    },
  ],
  [ChainId.BSC_TEST_NET]: [

  ],
}