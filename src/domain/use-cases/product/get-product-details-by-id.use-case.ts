type Variation = {
  id: string
  price: number
  hasStock: boolean
  color?: string
  size?: string
  imageUrl?: string
}

export type GetProductDetailsByIdUseCaseResponse = {
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

export interface GetProductDetailsByIdUseCase {
  getOneById: (id: string) => Promise<GetProductDetailsByIdUseCaseResponse>
}
