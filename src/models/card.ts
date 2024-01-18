export interface Card {
  name: string
  corpName: string
  tags: string[]
  benefit: string[]
  promotion?: {
    title: string
    terms: string
  }
  payback?: string
}

export type CardWithId = Card & { id: string }

export interface AdBanner {
  title: string
  description: string
  link: string
}
