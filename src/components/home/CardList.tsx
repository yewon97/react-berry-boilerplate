import { useInfiniteQuery } from 'react-query'
import { getCards } from '@remote/card'
import ListRow from '@shared/ListRow'
import { Card } from '@models/card'

import { flatten } from 'lodash'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

type CardWithId = Card & { id: string }

export default function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapshot) => snapshot.lastVisible,
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  if (data == null) {
    return null
  }

  const cards: CardWithId[] = flatten(data?.pages.map(({ items }) => items))

  return (
    <div>
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
      >
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
      </InfiniteScroll>
    </div>
  )
}
