import { useState } from 'react'
import Apply from '@/components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'

export default function ApplyPage() {
  const { mutate } = useApplyCardMutation({
    onSuccess: () => {
      // 값이 추가되었을 때 => 폴링시작
    },
    onError: () => {
      // 실패했을 때 => 폴링시작
      window.history.back()
    },
  })

  return <Apply onSubmit={mutate} />
}
