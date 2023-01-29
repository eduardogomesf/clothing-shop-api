import { Product } from '../../entities/product'

export interface GetProductsUseCase {
  get: () => Promise<Product[]>
}
