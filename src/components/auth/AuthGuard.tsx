import { auth } from '@remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

// 인증처리 -> 이 함수 거치고 나면 인증에 대한 검증이 끝났다는 것을 확인해줌
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false) // 인증 된지 안된지 확인

  onAuthStateChanged(auth, (user) => {
    console.log('user', user)

    // 인증처리가 완료 되었다를 여기서 값을 true로 바꿔주면서 확인해줌
    setInitialize(true)
  })

  if (initialize === false) {
    // initialize 안되면 로딩중 보여주기
    return <div>인증 처리중... 로딩중...</div>
  }

  return <>{children}</>
}
