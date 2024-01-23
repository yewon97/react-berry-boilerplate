import { FormValues } from '@models/signin'
import Form from '@components/signin/Form'
import { useCallback } from 'react'

export default function SigninPage() {
  const handleSubmit = useCallback((formValues: FormValues) => {}, [])

  return (
    <form>
      <Form onSubmit={handleSubmit} />
    </form>
  )
}
