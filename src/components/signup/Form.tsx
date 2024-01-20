import { ChangeEvent, useState } from 'react'
import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import Spacing from '@shared/Spacing'
import { FormValues } from '@models/signup'

export default function Form() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  const handleFormValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))
  }

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        type="email"
        placeholder="test@email.com"
        value={formValues.email}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        type="text"
        placeholder="홍길동"
        value={formValues.name}
        onChange={handleFormValues}
      />

      <FixedBottomButton label="회원가입" disabled={true} onClick={() => {}} />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`
