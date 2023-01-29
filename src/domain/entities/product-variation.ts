import { Product } from './product'

export interface ProductVariation {
  id: string
  price: number
  stock: number
  product_id: string
  color?: string
  size?: string
  image_url?: string
  product?: Product
}
