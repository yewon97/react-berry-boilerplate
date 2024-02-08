import { ChangeEvent, useCallback, useState } from 'react'

import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply'
import Select from '@components/shared/Select'
import { ApplyValues } from '@models/apply'
import FixedBottomButton from '@shared/FixedBottomButton'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>

export default function BasicInfo() {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  })

  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setInfoValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const isAllSelected = Object.values(infoValues).every((value) => value)

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomButton
        label="다음"
        // isAllSelected가 true면 상위페이지로 이벤트를 넘길 것임
        onClick={() => {}}
        disabled={isAllSelected === false}
      />
    </div>
  )
}
