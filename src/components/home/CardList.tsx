import { useInfiniteQuery } from 'react-query'
import { getCards } from '@remote/card'
import ListRow from '@shared/ListRow'
import { Card } from '@models/card'

import { flatten } from 'lodash'

type CardWithId = Card & { id: string }

export default function CardList() {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['cards'],
    ({ pageParam }) => getCards(pageParam),
    {
      getNextPageParam: (snapshot) => snapshot.lastVisible,
    },
  )

  if (data == null) {
    return null
  }

  const cards: CardWithId[] = flatten(data?.pages.map(({ items }) => items))

  return (
    <div>
      <ul>
        <button type="button" onClick={() => fetchNextPage()}>
          데이터 불러오기
        </button>
        {cards.map(({ corpName, benefit, name, tags, payback, id }, idx) => {
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
