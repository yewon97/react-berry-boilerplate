import { ApplyValues } from '@models/apply'
import { applyCard } from '@remote/apply'
import { useMutation } from 'react-query'

export default function useApplyCardMutation() {
  return useMutation((applyValues: ApplyValues) => applyCard(applyValues))
}
