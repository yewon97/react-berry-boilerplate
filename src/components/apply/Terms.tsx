import { useCallback, useState, MouseEvent } from 'react'
import Agreement from '@shared/Agreement'

import { TermsList } from '@constants/apply'

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

  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTrmsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce<Record<string, boolean>>(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )

  const allTermsChecked = Object.values(termsAgreements).every(
    (isTrue) => isTrue,
  )

  return (
    <Agreement>
      <Agreement.Title checked={allTermsChecked} onChange={handleAllAgreement}>
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
