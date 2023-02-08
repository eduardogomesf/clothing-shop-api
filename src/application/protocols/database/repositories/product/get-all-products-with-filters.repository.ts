import { Product } from '@/domain/entities'

export type GetAllProductsWithFiltersRepositoryDTO = {
  minPrice?: number
  maxPrice?: number
  search?: string
  categorySubcategoryIds?: string[]
  outOfStock: boolean
  page: number
  limit: number
}

export type GetAllProductsWithFiltersRepositoryResponse = Product

export interface GetAllProductsWithFiltersRepository {
  getWithFilters: (filters: GetAllProductsWithFiltersRepositoryDTO) => Promise<GetAllProductsWithFiltersRepositoryResponse[]>
}
