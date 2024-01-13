import { css } from '@emotion/react'
import { colors } from './colorPalette'

const buttonColorMap = {
  primary: css`
    background-color: ${colors.blue};
    color: ${colors.white};
  `,
  success: css`
    background-color: ${colors.green};
    color: ${colors.white};
  `,
  error: css`
    background-color: ${colors.red};
    color: ${colors.white};
  `,
}
