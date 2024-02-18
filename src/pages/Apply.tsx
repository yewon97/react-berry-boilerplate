import { useState } from 'react'
import Apply from '@/components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'

export default function ApplyPage() {
  const [readyToPoll, setReadyToPoll] = useState(false)

  usePollApplyStatus({
    onSuccess: () => {
      console.log('성공')
    },
    onError: () => {
      console.log('실패')
    },
    enabled: readyToPoll,
  })

  const { mutate } = useApplyCardMutation({
    onSuccess: () => {
      // 값이 추가되었을 때 => 폴링시작
      setReadyToPoll(true)
    },
    onError: () => {
      // 실패했을 때 => 폴링시작
      window.history.back()
    },
  })

  return <Apply onSubmit={mutate} />
}
