import {
  collection,
  getDocs,
  QuerySnapshot,
  query,
  limit,
  startAfter,
} from 'firebase/firestore'
import { store } from './firebase'

import { COLLECTIONS } from '@constants'
import { Card } from '@models/card'

// pageParam : 지금 보이고 있는 맨 마지막 요소
export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(10))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(10),
        )

  const cardSnapshot = await getDocs(cardQuery)

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}
