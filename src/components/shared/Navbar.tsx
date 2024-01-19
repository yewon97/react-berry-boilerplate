import { colors } from '@styles/colorPalette'
import { css } from '@emotion/react'

import Button from '@shared/Button'
import Flex from '@shared/Flex'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      <Link to="/signup">
        <Button>로그인/회원가입</Button>
      </Link>
    </Flex>
  )
}

const navbarContainerStyles = css`
  position: sticky;
  top: 0;
  padding: 10px 24px;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.grey};
  z-index: 10;
`
