import Agreement from '@shared/Agreement'

import { TermsList } from '@constants/apply'

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
      {TermsList.map(({ id, title, link }) => {
        return (
          <Agreement.Description
            key={id}
            checked={false}
            link={link}
            onChange={(e, checked) => {
              console.log(checked)
            }}
          >
            {title}
          </Agreement.Description>
        )
      })}
    </Agreement>
  )
}
