import { ProductVariation } from './product-variation'

export interface Product {
  id: string
  name: string
  category_subcategory_id: string
  description?: string
  variations?: ProductVariation[]
}
