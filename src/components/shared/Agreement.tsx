import { css } from '@emotion/react'
import Flex from '@components/shared/Flex'
import Text from '@components/shared/Text'
import { colors } from '@styles/colorPalette'
import { MouseEvent } from 'react'

export default function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" as="ul" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}
function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex onClick={(e) => onChange(e, !checked)} as="li">
      <IconCheck checked={checked} />
      <Text bold={true}>{children}</Text>
    </Flex>
  )
}
function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  link?: string
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li">
      <Flex onClick={(e) => onChange(e, !checked)}>
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link != null ? (
        <a href={link} target="_blank" rel="noreferrer">
          <MoveArrow />
        </a>
      ) : null}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

function IconCheck({ checked }: { checked: boolean }) {
  return (
    <svg id="Layer_1" version="1.1" viewBox="0 0 48 48" width={24} height={24}>
      <g>
        <path
          d="M24,46C11.9,46,2,36.1,2,24S11.9,2,24,2s22,9.9,22,22S36.1,46,24,46z M24,4C13,4,4,13,4,24c0,11,9,20,20,20   c11,0,20-9,20-20C44,13,35,4,24,4z"
          fill={checked ? colors.blue : colors.grey}
        />
      </g>
      <g>
        <polygon
          points="20,34.1 11.3,25.4 12.7,23.9 20,31.2 35.3,15.9 36.7,17.4  "
          fill={checked ? colors.blue : colors.grey}
        />
      </g>
    </svg>
  )
}

function MoveArrow() {
  return (
    <svg
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="20"
      height="20"
    >
      <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
    </svg>
  )
}

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`

/**
 * <Agreement>
 * 	<Agreement.Title></Agreement.Title>
 * 	<Agreement.Description></Agreement.Description>
 * 	<Agreement.Description></Agreement.Description>
 * </Agreement>
 */
