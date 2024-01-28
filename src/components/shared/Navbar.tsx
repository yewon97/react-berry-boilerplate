import { colors } from '@styles/colorPalette'
import { css } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import { Link, useLocation } from 'react-router-dom'
import { userAtom } from '@atoms/user'
import useUser from '@hooks/auth/useUser'
import { useCallback } from 'react'

export default function Navbar() {
  const location = useLocation()
  const showSignButton =
    ['/signup', 'signin'].includes(location.pathname) === false

  const user = useUser()

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
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
