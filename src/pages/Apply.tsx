import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'
import Terms from '@components/apply/Terms'
import { useState } from 'react'

import { ApplyValues } from '@models/apply'

export default function ApplyPage() {
  const [step, setStep] = useState(2)

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

  return (
    <>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo /> : null}
    </>
  )
}
