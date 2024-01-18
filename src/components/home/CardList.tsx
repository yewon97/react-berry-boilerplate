import { useInfiniteQuery } from 'react-query'
import { getCards } from '@remote/card'
import ListRow from '@shared/ListRow'
import { Card, CardWithId } from '@models/card'

import { flatten } from 'lodash'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Badge from '@shared/Badge'
import { useNavigate } from 'react-router-dom'

export default function CardList() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapshot) => snapshot.lastVisible,
  })

  const navigate = useNavigate()

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
        scrollThreshold="100px" // 어느 위치에서 데이터 fetch할지 정할 수 있음
      >
        <ul>
          {cards.map(({ name, payback, id }, idx) => {
            return (
              <ListRow
                key={id}
                contents={
                  <ListRow.Texts title={`${idx + 1}위`} subTitle={name} />
                }
                right={payback != null ? <Badge label={payback} /> : null}
                withArrow={true}
                onClick={() => {
                  navigate(`/card/${id}`)
                }}
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}
