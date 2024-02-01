import Agreement from '@shared/Agreement'

import { TermsList } from '@constants/apply'
import { useState } from 'react'

export default function Terms() {
  const [termsAgreements, setTrmsAgreements] = useState(() => {
    return TermsList.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })

  const allTermsChecked = Object.values(termsAgreements).every(
    (isTrue) => isTrue,
  )

  return (
    <Agreement>
      <Agreement.Title
        checked={allTermsChecked}
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
            checked={termsAgreements[id]}
            link={link}
            onChange={(e, checked) => {
              setTrmsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        )
      })}
    </Agreement>
  )
}
