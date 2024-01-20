import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@remote/firebase'

import Form from '@signup/Form'
import { FormValues } from '@models/signup'

export default function SignupPage() {
  // Form에 안만들고 page 안 signup 페이지에 회원가입 로직을 만듬

  const handleSubmit = async (formValues: FormValues) => {
    console.log('formValues: ', formValues)
    const { email, password } = formValues

    const user = await createUserWithEmailAndPassword(auth, email, password)
    console.log('user: ', user)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}></Form>
    </div>
  )
}
