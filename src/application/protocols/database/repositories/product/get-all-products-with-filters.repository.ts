import { Product } from '@/domain/entities/product'

export interface GetAllProductsWithFiltersRepositoryDTO {
  minPrice?: number
  maxPrice?: number
  search?: string
  categorySubcategoryIds?: string[]
  outOfStock: boolean
  page: number
  limit: number
}

export interface GetAllProductsWithFiltersRepository {
  getWithFilters: (filters: GetAllProductsWithFiltersRepositoryDTO) => Promise<Product[]>
}
