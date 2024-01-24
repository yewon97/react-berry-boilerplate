import { FormValues } from '@models/signin'
import Form from '@components/signin/Form'
import { useCallback } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@remote/firebase'

export default function SigninPage() {
  const handleSubmit = useCallback(async (formValues: FormValues) => {
    const { email, password } = formValues

    const response = await signInWithEmailAndPassword(auth, email, password)
    console.log('response: ', response)
  }, [])

  return (
    <form>
      <Form onSubmit={handleSubmit} />
    </form>
  )
}
