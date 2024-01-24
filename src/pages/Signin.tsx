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

      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        console.log('response: ', response)
      } catch (e) {
        // firebase의 에러
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
          title: '잠시 후 다시 시도해주세요',
          onButtonClick: () => {
            //
          },
        })
      }
    },
    [open],
  )

  return (
    <form>
      <Form onSubmit={handleSubmit} />
    </form>
  )
}
