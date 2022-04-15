import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount, Pair, WETH } from '@photonswap/sdk'
import { useMemo } from 'react'
import { ELK, ICY, UNI, USDC, USDT } from '../../constants'
import { STAKING_REWARDS_INTERFACE } from '../../constants/abis/staking-rewards'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'

export const FARMING_GENESIS = 1646571780

export const REWARDS_DURATION_DAYS = 180
export const LATEST_FARM_ID = 37;
// TODO add staking rewards addresses here
export const FARMING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    farmId: number,
    tokens: [Token, Token]
    stakingRewardAddress: string,
    extraMessage: string,
    rewardEnded: boolean,
    rewardTokenName: string,
    rewardTokenAddress: string,
    rewardTokenSymbol: string,
    rewardTokenDecimals: number
  }[]
} = {
  [ChainId.CRONOSMAINNET]: [
    {
      farmId: 31,
      extraMessage: 'Reward Starts: 2022-03-07 05:30:00 UTC',
      tokens: [WETH[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0xA23A7dE7DD54a9AED0725490fe30830e3E16dE2c',
      rewardEnded: false,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 32,
      extraMessage: 'Reward Starts: 2022-03-07 05:30:00 UTC',
      tokens: [USDT[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x0EaaB538861e8A8b025D21914A1346A334211313',
      rewardEnded: false,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 33,
      extraMessage: 'Reward Starts: 2022-03-07 05:30:00 UTC',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xe0c41FF9a7032de445771E12C14868CbE061C993', 18, 'DxP', 'DexPad')],
      stakingRewardAddress: '0xb466a2E8E7544AB44F7F9ac6D17cA9Cc20cb0e6F',
      rewardEnded: false,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 34,
      extraMessage: 'Reward Starts: 2022-03-07 05:30:00 UTC',
      tokens: [WETH[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x490497e69BD068Fe3156019CC6E702565f23e684',
      rewardEnded: false,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 35,
      extraMessage: 'Reward Starts: 2022-03-07 05:30:00 UTC',
      tokens: [WETH[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x733247606e3eD074B95bCa8C52fa5d33DAf5e475',
      rewardEnded: false,
      rewardTokenAddress: '0xe0c41FF9a7032de445771E12C14868CbE061C993',
      rewardTokenName: 'DexPad',
      rewardTokenSymbol: 'DxP',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 36,
      extraMessage: 'Reward Starts: 2022-03-13 06:30:00 UTC',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0x55210C2a69b4c52a9d9289A257D54d35C4a2d2eC', 9, 'BANK', 'CroBank')],
      stakingRewardAddress: '0xF221125FBD0C0840AF3Ad2D8F5bf45fac94Cd6cE',
      rewardEnded: false,
      rewardTokenAddress: '0x55210C2a69b4c52a9d9289A257D54d35C4a2d2eC',
      rewardTokenName: 'CroBank',
      rewardTokenSymbol: 'BANK',
      rewardTokenDecimals: 9,
    },
    {
      farmId: 37,
      extraMessage: 'Reward Starts: 2022-03-25 07:00:00 UTC',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0x80991d751Eb39dcD86FCcd19b261c39215795094', 18, 'STABIL', 'Stabil')],
      stakingRewardAddress: '0x467eDE3b84483C6a7310ce16D3D1b92f68adFE0a',
      rewardEnded: false,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 20,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x88ef8D83ca712306B24bfA2982b51113Fe37FC1f',
      rewardEnded: true,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 21,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [USDT[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x81319E3Ac6A696d65065FBD4f1B3566B1Cf4d672',
      rewardEnded: true,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 22,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xe0c41FF9a7032de445771E12C14868CbE061C993', 18, 'DxP', 'DexPad')],
      stakingRewardAddress: '0x60231028d16583471eC443F9079cFab85F6D2731',
      rewardEnded: true,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 23,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x2122e2e77daEB85A95682e3E75810A8755cE758a',
      rewardEnded: true,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 24,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x7597B43A886F3dED1014636B8f31826B5A6882C5',
      rewardEnded: true,
      rewardTokenAddress: '0xe0c41FF9a7032de445771E12C14868CbE061C993',
      rewardTokenName: 'DexPad',
      rewardTokenSymbol: 'DxP',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 25,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0x7F7BE9FD8a2d36ebf55faC9a062AaA738C114BE6', 4, 'CROVID', 'CROVID-19')],
      stakingRewardAddress: '0x2BDA72aA94e44abf672211162Af99e7b07Ba6494',
      rewardEnded: true,
      rewardTokenAddress: '0x7F7BE9FD8a2d36ebf55faC9a062AaA738C114BE6',
      rewardTokenName: 'CROVID-19',
      rewardTokenSymbol: 'CROVID',
      rewardTokenDecimals: 4,
    },
    {
      farmId: 10,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0xAb2e8F88b222b1cBB07610F29F7a9e2B9d63701c',
      rewardEnded: true,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 15,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x3d93E762233aE4a5C60a29a6fb2312F59aD926d5',
      rewardEnded: true,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 16,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [USDT[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0xF607D073f91bC036A215094E4f93058f5362C817',
      rewardEnded: true,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {

      farmId: 17,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xe0c41FF9a7032de445771E12C14868CbE061C993', 18, 'DxP', 'DexPad')],
      stakingRewardAddress: '0xB151c4852F7b2730caf02fB8aC66EEe8De4807dC',
      rewardEnded: true,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 18,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], ICY[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x0597dc6e387C0Faff6076aC1d959364EBC02D42d',
      rewardEnded: true,
      rewardTokenAddress: ICY[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'ICY',
      rewardTokenSymbol: 'ICY',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 19,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x57952d4Eb35C810F567dD04bddC71DE4eFB40745',
      rewardEnded: true,
      rewardTokenAddress: UNI[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 12,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [USDT[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x4eB324F0233E4A4EE1B97E927E4b6578E1B5b726',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 11,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], ICY[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0xC37Ed3fe538264f1f896C444c6EBdFB8E9C266F2',
      rewardEnded: true,
      rewardTokenAddress: ICY[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'ICY',
      rewardTokenSymbol: 'ICY',
      rewardTokenDecimals: 18,
    }, {
      farmId: 14,
      extraMessage: 'Please remove your LP from this pool as the rewards are ended',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xc82eA25896F065cB6E3ae298cD1f23FE58516A35', 8, 'ESSO', 'ESSO')],
      stakingRewardAddress: '0x05d898b9abDEa94D286AE1beC2e0EA031EA07791',
      rewardEnded: true,
      rewardTokenAddress: '0xc82eA25896F065cB6E3ae298cD1f23FE58516A35',
      rewardTokenName: 'ESSO',
      rewardTokenSymbol: 'ESSO',
      rewardTokenDecimals: 8,
    },
    {
      farmId: 13,
      extraMessage: 'Please remove your LP from this pool as the rewards are ended',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0x34bAC19d5EAd9f92252eA81Ca9014799C32ff123', 18, 'CRC', 'CROCOS')],
      stakingRewardAddress: '0xE799eF8FBe2A8601914480aD67ed6ED57eb6cb0C',
      rewardEnded: true,
      rewardTokenAddress: '0x34bAC19d5EAd9f92252eA81Ca9014799C32ff123',
      rewardTokenName: 'CROCOS',
      rewardTokenSymbol: 'CRC',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 1,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], UNI[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0xBC02e3b80e830d9da28976Dd62562C4BDa0a90cd',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {

      farmId: 2,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [USDT[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x2CBB651E8F339dEC1F914AE6b8717e98A45e83B7',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {

      farmId: 3,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xe0c41FF9a7032de445771E12C14868CbE061C993', 18, 'DxP', 'DexPad')],
      stakingRewardAddress: '0x7e0f15E7684b92CE51c2F8cb05b14B577b11f975',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {

      farmId: 4,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x246E9893c3736DAAEFF818db65c6BaE07A34C3B1',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {

      farmId: 5,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xe0c41FF9a7032de445771E12C14868CbE061C993', 18, 'DxP', 'DexPad')],
      stakingRewardAddress: '0xe38125950c7bF32d634231C1bBDc4Cbc0B1D11E5',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {

      farmId: 6,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x1173EC73A71F175d09BB064739F6DF1Cb67b8cEE',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {

      farmId: 7,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [USDT[ChainId.CRONOSMAINNET], USDC[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0xd0C1DCD0bD07aFcccFA31dc4F81B0f8EFF25B8C4',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 8,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], ICY[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0xa047DE5285b461b6943b5d77f99aB5f6234fA5cF',
      rewardEnded: true,
      rewardTokenAddress: ICY[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'ICY',
      rewardTokenSymbol: 'ICY',
      rewardTokenDecimals: 18,
    },
    {

      farmId: 9,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], ELK[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0x69d9B0CED431488470C68893a35a953E8d85EE70',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 27,
      extraMessage: 'Please remove your LP from this pool and move it to new pool.',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0x55210C2a69b4c52a9d9289A257D54d35C4a2d2eC', 9, 'BANK', 'CroBank')],
      stakingRewardAddress: '0x0839bb785cc17f089129142b10BF58512c885A3D',
      rewardEnded: true,
      rewardTokenAddress: '0xbdd4e5660839a088573191A9889A262c0Efc0983',
      rewardTokenName: 'PHOTON',
      rewardTokenSymbol: 'PHOTON',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 28,
      extraMessage: 'Please remove your LP from this pool',
      tokens: [USDC[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0xbdd4e5660839a088573191A9889A262c0Efc0983', 18, 'PHOTON', 'Photonswap')],
      stakingRewardAddress: '0x58052AcCa0B8Cd6AB98578B0Ba39D08708F62e14',
      rewardEnded: true,
      rewardTokenAddress: '0x55210C2a69b4c52a9d9289A257D54d35C4a2d2eC',
      rewardTokenName: 'CroBank',
      rewardTokenSymbol: 'BANK',
      rewardTokenDecimals: 9,
    },
    {
      farmId: 29,
      extraMessage: 'Reward Starts: 2022-02-22 05:30:00 UTC',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0x7F7BE9FD8a2d36ebf55faC9a062AaA738C114BE6', 4, 'CROVID', 'CROVID-19')],
      stakingRewardAddress: '0x28B1966dfABF437269a3932e147db0F16Da1dbd5',
      rewardEnded: false,
      rewardTokenAddress: '0x7F7BE9FD8a2d36ebf55faC9a062AaA738C114BE6',
      rewardTokenName: 'CROVID-19',
      rewardTokenSymbol: 'CROVID',
      rewardTokenDecimals: 4,
    },
    {
      farmId: 30,
      extraMessage: 'Reward start time:  04 Mar 2022 11:00:00 AM GMT',
      tokens: [WETH[ChainId.CRONOSMAINNET], ICY[ChainId.CRONOSMAINNET]],
      stakingRewardAddress: '0xF328F4D925f68a7454e2c714072D9645369A39b3',
      rewardEnded: false,
      rewardTokenAddress: ICY[ChainId.CRONOSMAINNET].address,
      rewardTokenName: 'ICY',
      rewardTokenSymbol: 'ICY',
      rewardTokenDecimals: 18,
    },
    {
      farmId: 26,
      extraMessage: 'Please remove your LP from this pool',
      tokens: [WETH[ChainId.CRONOSMAINNET], new Token(ChainId.CRONOSMAINNET, '0x704a51BdAcC8cB12d2E73d64E0af961d59DE53D6', 18, 'MCRO', 'Micro Finance')],
      stakingRewardAddress: '0xA0788bCbc84d88CfE5F281b86e7cDf3F8C93ADa0',
      rewardEnded: true,
      rewardTokenAddress: '0x704a51BdAcC8cB12d2E73d64E0af961d59DE53D6',
      rewardTokenName: 'Micro Finance',
      rewardTokenSymbol: 'MCRO',
      rewardTokenDecimals: 18,
    },
  ],
  [ChainId.CRONOSTEST]: [
    // {
    //   tokens: [WETH[ChainId.CRONOSTEST],new Token(ChainId.CRONOSTEST, '0xc2A4c5A50401f8C65b98D1038Ed666a91f1Fd9a9', 18, 'DxP', 'DexPad')],
    //   stakingRewardAddress: '0x4a3B46AF00828Ae3163D0c5C160568B2c4c486A0'
    // },
    // {
    //   extraMessage: 'Rewards will be reduced once this pool ends.',
    //   tokens: [UNI[ChainId.CRONOSTEST], new Token(ChainId.CRONOSTEST, '0x4312fdf178764E17C88019cCbcfC9b5062Dd5533', 18, '', '')],
    //   stakingRewardAddress: '0x123A5e5497701bE4Ec9b8aB429a3BF7E91b278eb'
    // } ,
    // {
    //   tokens: [WETH[ChainId.CRONOSTEST], USDC],
    //   stakingRewardAddress: '0x7FBa4B8Dc5E7616e59622806932DBea72537A56b'
    // },
    // {
    //   tokens: [WETH[ChainId.CRONOSTEST], USDT],
    //   stakingRewardAddress: '0x6C3e4cb2E96B01F4b866965A91ed4437839A121a'
    // },
    // {
    //   tokens: [WETH[ChainId.CRONOSTEST], WBTC],
    //   stakingRewardAddress: '0xCA35e32e7926b96A9988f61d510E038108d8068e'
    // }
  ]
}

export interface FarmingInfo {
  farmId: number,
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
  // Reward Token
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
export function useFarmingInfo(pairToFilterBy?: Pair | null, tokenToFilterBy?: Token | null, farmId?: number | null): FarmingInfo[] {
  const { chainId, account } = useActiveWeb3React()
  const info = useMemo(
    () =>
      chainId
        ? FARMING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
          (pairToFilterBy === undefined
            ? true
            : pairToFilterBy === null
              ? tokenToFilterBy != null && tokenToFilterBy !== undefined ?
                (stakingRewardInfo.tokens[0].address === tokenToFilterBy.address)
                : []
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
              pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])) && (farmId === undefined || farmId === null ? true : stakingRewardInfo.farmId === farmId)
        ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

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

    return rewardsAddresses.reduce<FarmingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      console.log('memo, rewardAddress, index', memo, rewardsAddress, index)
      const rewardToken = new Token(chainId, info[index].rewardTokenAddress, info[index].rewardTokenDecimals, info[index].rewardTokenSymbol, info[index].rewardTokenName)
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
          console.error('Failed to load staking rewards info')
          console.error('Balance State', balanceState?.error)
          console.error('earnedAmountState State', earnedAmountState?.error)
          console.error('totalSupplyState State', totalSupplyState?.error)
          console.error('rewardRateState State', rewardRateState?.error)
          return memo
        }

        // get the LP token
        const tokens = info[index].tokens
        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))

        // check for account, if no account set to 0
        const stakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))
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

        memo.push({
          farmId: info[index].farmId,
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

      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info, periodFinishes, rewardRates, rewardsAddresses, totalSupplies, uni])
}

// based on typed value
export function useDerivedFarmInfo(
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