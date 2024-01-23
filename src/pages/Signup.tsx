import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, store } from '@remote/firebase'
import { collection, doc, setDoc } from 'firebase/firestore'

import Form from '@signup/Form'
import { FormValues } from '@models/signup'
import { COLLECTIONS } from '@constants'

export default function SignupPage() {
  // Form에 안만들고 page 안 signup 페이지에 회원가입 로직을 만듬

  const handleSubmit = async (formValues: FormValues) => {
    const { email, password, name } = formValues

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, {
      displayName: name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}></Form>
    </div>
  )
}
