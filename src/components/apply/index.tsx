import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import Terms from '@components/apply/Terms'
import { useState } from 'react'

import { ApplyValues } from '@models/apply'

export default function Apply({
  step,
  onSubmit,
}: {
  step: number
  onSubmit: () => void
}) {
  // 카드신청하는 페이지 -> 데이터를 모으고 있음
  // 카드신청 페이지에서는 데이터 변화하는건 별로 궁금하지 않음
  // 완성본만 궁금함
  // 완성본만 넘겨주고, 완성본으로 카드신청을 하고 싶음

  // pick 으로 뽑게되면 객체로 나옴
  // terms는 string array니까 ApplyValues['terms'] --> 이렇게 type 지정해야함
  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log('terms: ', terms)
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>,
  ) => {
    console.log('BasicInfo infoValues: ', infoValues)
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>,
  ) => {
    console.log('cardInfoValues: ', cardInfoValues)
  }

  return (
    <>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </>
  )
}
