import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply'
import Select from '@components/shared/Select'

export default function BasicInfo() {
  return (
    <div>
      <Select
        label="연소득"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value=""
      />
      <Select
        label="신용점수"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value=""
      />
      <Select
        label="결제일"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value=""
      />
    </div>
  )
}
