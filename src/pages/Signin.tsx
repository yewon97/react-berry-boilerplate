import { FormValues } from '@models/signin'
import Form from '@components/signin/Form'
import { useCallback } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { useAlertContext } from '@contexts/AlertContext'
import { FirebaseError } from 'firebase/app'

export default function SigninPage() {
  const { open } = useAlertContext()

  const handleSubmit = useCallback(
    async (formValues: FormValues) => {
      const { email, password } = formValues
      console.log('email: ', email)

      console.log('auth: ', auth)
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log('res: ', res)
        })
        .catch((e) => {
          // firebase 의 에러
          if (e instanceof FirebaseError) {
            if (e.code === 'auth/wrong-password') {
              open({
                title: '계정의 정보를 다시 확인해주세요',
                onButtonClick: () => {
                  //
                },
              })

              return
            }
          }

          // 일반적인 에러
          open({
            title: '잠시 후 다시 시도해주세요.',
            onButtonClick: () => {
              //
            },
          })
        })
    },
    [open],
  )

  return (
    // <form>
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
    // </form>
  )
}
