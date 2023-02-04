import { Product } from '../../entities/product'

export interface GetProductsUseCaseDTO {
  minPrice?: number
  maxPrice?: number
  search?: string
  categoryId?: string
  subcategoryId?: string
  withoutStock?: boolean
  page: number
  itemsPerPage: number
}
export interface GetProductsUseCase {
  get: (filters: GetProductsUseCaseDTO) => Promise<Product[]>
}
