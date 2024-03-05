import { useQuery } from 'react-query'

import { Link } from 'react-router-dom'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { getAdBanners } from '@remote/adBanner'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { colors } from '@styles/colorPalette'
import { AdBanner } from '@models/card'

export default function AdBanners() {
  const { data, isLoading } = useQuery(['addBanners'], () => getAdBanners())

  if (data == null || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold={true}>$nbsp;</Text>
          <Text typography="t7">$nbsp;</Text>
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data?.map(({ title, link, description }: AdBanner, idx) => {
          return (
            <SwiperSlide key={idx}>
              <Link to={link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold={true}>{title}</Text>
                  <Text typography="t7">{description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`
