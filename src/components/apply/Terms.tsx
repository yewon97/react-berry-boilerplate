import Agreement from '@shared/Agreement'

export default function Terms() {
  return (
    <Agreement>
      <Agreement.Title
        checked={true}
        onChange={(e, checked) => {
          console.log(e)
          console.log(checked)
        }}
      >
        약관에 모두 동의
      </Agreement.Title>
      <Agreement.Description
        checked={false}
        onChange={(e, checked) => {
          console.log(e)
          console.log(checked)
        }}
      >
        약관 1
      </Agreement.Description>
      <Agreement.Description
        checked={true}
        onChange={(e, checked) => {
          console.log(e)
          console.log(checked)
        }}
        link="google.com"
      >
        약관 2
      </Agreement.Description>
    </Agreement>
  )
}
