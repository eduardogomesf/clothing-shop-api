import { Product } from '@/domain/entities/product'

export interface GetAllProductsWithFiltersRepository {
  getWithFilters: () => Promise<Product[]>
}
