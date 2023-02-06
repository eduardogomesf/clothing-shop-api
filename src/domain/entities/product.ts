import { ProductVariation } from './product-variation'

export interface Product {
  id: string
  name: string
  categorySubCategoryId: string
  description?: string
  variations: ProductVariation[]
}
