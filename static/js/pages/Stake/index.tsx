import React, { useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
import { TYPE } from '../../theme'
import PoolCard from '../../components/Stake/PoolCard'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/Stake/styled'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import Toggle from '../../components/Toggle'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

export default function Stake() {
  const { chainId } = useActiveWeb3React()
  const stakingInfos = useStakingInfo()
  const [isArchived, setIsArchived] = useState(false)

  const DataRow = styled(RowBetween)`
    ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `};
  `

  function handleArchiveTabChange() {
    setIsArchived(!isArchived);
  }


  const stakingRewardsExist = Boolean(typeof chainId === 'number' && (STAKING_REWARDS_INFO[chainId]?.length ?? 0) > 0)

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>{process.env.REACT_APP_NAME} Liquidity Mining Rewards</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your Liquidity Provider tokens to receive PHOTON, the {process.env.REACT_APP_NAME} protocol governance token.
                </TYPE.white>
              </RowBetween>{' '}
              {/* <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://blog.photonswap.finance/blog/uni/"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about CRO</TYPE.white>
              </ExternalLink> */}
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>Participating pools</TYPE.mediumHeader>
          <Toggle name1={"Running Stake"} name2={"Ended Stake"} isActive={!isArchived} toggle={handleArchiveTabChange} />
        </DataRow>

        <PoolSection>
          {stakingRewardsExist && stakingInfos?.length === 0 ? (
            <Loader style={{ margin: 'auto' }} />
          ) : !stakingRewardsExist ? (
            'No active rewards'
          ) : (
            isArchived
              ? stakingInfos?.filter(stakingInfo => stakingInfo.rewardEnded === true)?.map(stakingInfo => {
                // need to sort by added liquidity here and reward ended
                return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
              })
              : stakingInfos?.filter(stakingInfo => stakingInfo.rewardEnded === false)?.map(stakingInfo => {
                // need to sort by added liquidity here and reward is running
                return <PoolCard key={stakingInfo.stakingRewardAddress} stakingInfo={stakingInfo} />
              })

          )}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}
