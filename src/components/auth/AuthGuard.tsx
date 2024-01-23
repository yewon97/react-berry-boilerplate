import { auth } from '@remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'

// 인증처리 -> 이 함수 거치고 나면 인증에 대한 검증이 끝났다는 것을 확인해줌
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)

  onAuthStateChanged(auth, (user) => {
    console.log('user', user)
    setInitialize(true)
  })

  if (initialize === false) {
    return <div>인증 처리중... 로딩중...</div>
  }

  return <>{children}</>
}
