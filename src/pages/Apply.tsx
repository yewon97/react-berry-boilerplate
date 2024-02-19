import { useState } from 'react'
import Apply from '@/components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@remote/apply'
import { APPLY_STATUS } from '@models/apply'
import useUser from '@hooks/auth/useUser'
import { useParams } from 'react-router-dom'

export default function ApplyPage() {
  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }

  usePollApplyStatus({
    onSuccess: () => {
      updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
    },
    onError: () => {
      updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })
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
