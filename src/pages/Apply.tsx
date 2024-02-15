import { useState } from 'react'
import Apply from '@/components/apply'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'

export default function ApplyPage() {
  const { mutate } = useApplyCardMutation()

  return <Apply onSubmit={mutate} />
}
