import { Product } from './product'

export interface ProductVariation {
  id: string
  price: number
  stock: number
  productId: string
  color?: string
  size?: string
  imageUrl?: string
  product?: Product
}
