import Button from '@shared/Button'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'
import { colors } from '@styles/colorPalette'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export default function FixedBottomButton({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot == null) {
    return null
  }

  return createPortal(
    <Container>
      <Button
        size="medium"
        disabled={disabled}
        full={true}
        onClick={onClick}
        css={buttonStyles}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideup = keyframes`
	to {
		transform: translateY(0);
	}
`

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    360deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.955641631652661) 25%,
    rgba(255, 255, 255, 0.894016981792717) 50%,
    rgba(255, 255, 255, 0.5662858893557423) 75%,
    rgba(255, 255, 255, 0.22735031512605042) 100%
  );
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`
const buttonStyles = css`
  border-radius: 8px;
`
