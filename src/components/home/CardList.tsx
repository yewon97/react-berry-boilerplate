import { useQuery, useInfiniteQuery } from 'react-query'

import { getCards } from '@remote/card'

import ListRow from '@shared/ListRow'

import { Card } from '@models/card'

export default function CardList() {
  const { data } = useQuery(['cards'], () => getCards())

  if (data == null) {
    return null
  }

  return (
    <div>
      <ul>
        {data.map(({ corpName, benefit, name, tags, payback, id }, idx) => {
          return (
            <ListRow
              key={id}
              contents={
                <ListRow.Texts title={`${idx + 1}위`} subTitle={name} />
              }
              right={payback != null ? <div>{payback}</div> : null}
              withArrow={true}
            />
          )
        })}
      </ul>
    </div>
  )
}
