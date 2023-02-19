
type Variation = {
  id: string
  price: number
  stock: number
  color?: string
  size?: string
  imageUrl?: string
}

export type GetProductByIdWithVariationsRepositoryResponse = {
  id: string
  name: string
  description: string
  variations: Variation[]
  category: {
    id: string
    name: string
    subcategory: {
      id: string
      name: string
    }
  }
}

export interface GetProductByIdWithVariationsRepository {
  getById: (id: string) => Promise<GetProductByIdWithVariationsRepositoryResponse>
}
