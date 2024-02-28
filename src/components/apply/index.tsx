import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import Terms from '@components/apply/Terms'
import { useEffect, useState } from 'react'

import { ApplyValues, APPLY_STATUS } from '@models/apply'
import useUser from '@hooks/auth/useUser'
import { useParams } from 'react-router-dom'

export default function Apply({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) {
  const user = useUser()
  const { id } = useParams() as { id: string }

  const storageKey = `applied-${user?.uid}-${id}`

  // 지연초기화 (리렌더링 되어도 최초에 한번만)
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>(() => {
    const applied = localStorage.getItem(storageKey)

    if (applied == null) {
      return {
        userId: user?.uid,
        cardId: id,
        step: 0,
      }
    }

    return JSON.parse(applied)
  })

  useEffect(() => {
    if (applyValues.step === 3) {
      localStorage.removeItem(storageKey)

      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    } else {
      localStorage.setItem(storageKey, JSON.stringify(applyValues))
    }
  }, [applyValues, onSubmit, storageKey])
  // 카드신청하는 페이지 -> 데이터를 모으고 있음
  // 카드신청 페이지에서는 데이터 변화하는건 별로 궁금하지 않음
  // 완성본만 궁금함
  // 완성본만 넘겨주고, 완성본으로 카드신청을 하고 싶음

  // pick 으로 뽑게되면 객체로 나옴
  // terms는 string array니까 ApplyValues['terms'] --> 이렇게 type 지정해야함
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
      step: (applyValues.step as number) + 1,
    }))
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
      step: (applyValues.step as number) + 1,
    }))
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>,
  ) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
      step: (applyValues.step as number) + 1,
    }))
  }

  return (
    <>
      {applyValues.step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {applyValues.step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : null}
      {applyValues.step === 2 ? (
        <CardInfo onNext={handleCardInfoChange} />
      ) : null}
    </>
  )
}
