import { useState } from 'react'
import Apply from '@/components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import { updateApplyCard } from '@remote/apply'
import { APPLY_STATUS } from '@models/apply'
import useUser from '@hooks/auth/useUser'
import { useParams, useNavigate } from 'react-router-dom'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import { useAlertContext } from '@contexts/AlertContext'

export default function ApplyPage() {
  const navigate = useNavigate()

  const { open } = useAlertContext()

  const [readyToPoll, setReadyToPoll] = useState(false)

  const user = useUser()
  const { id } = useParams() as { id: string }

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id,
    options: {
      onSuccess: (applied) => {
        if (applied == null) {
          return
        }

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })

          return
        }

        // 카드 신청건이 있는데 완료 상태가 아님
        setReadyToPoll(true) // 카드사로 재심사 (폴링)
      },
      onError: () => {},
      suspense: true, // <Suspense fallback={}>
    },
  })

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      })
      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      })

      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })

  const { mutate, isLoading: 카드를신청중인가 } = useApplyCardMutation({
    onSuccess: () => {
      // 값이 추가되었을 때 => 폴링시작
      setReadyToPoll(true)
    },
    onError: () => {
      // 실패했을 때 => 폴링시작
      window.history.back()
    },
  })

  if (data != null && data.status === APPLY_STATUS.COMPLETE) {
    // 이미 완료된 카드입니다. 노출 백그라운드 아무것도 노출 안됨
    return null
  }

  if (readyToPoll || 카드를신청중인가) {
    return <div>Loading...</div>
  }

  return <Apply onSubmit={mutate} />
}
