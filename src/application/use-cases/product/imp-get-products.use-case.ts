import { GetProductsUseCase } from '@/domain/use-cases/product/get-products.use-case'
import { Product } from '@/domain/entities/product'
import { GetAllProductsWithFiltersRepository } from '../../protocols/database/repositories/customer-address/get-all-products-with-filters.repository'

export class ImpGetProductsUseCase implements GetProductsUseCase {
  constructor(
    private readonly getAllProductsWithFiltersRepository: GetAllProductsWithFiltersRepository
  ) {}

  async get (): Promise<Product[]> {
    const products = await this.getAllProductsWithFiltersRepository.getWithFilters()

    if (!products || products.length <= 0) {
      return []
    }

    return products
  }
}
