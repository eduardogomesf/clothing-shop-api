import { GetAllProductsWithFiltersRepository } from '@/application/protocols/database/repositories/product/get-all-products-with-filters.repository'
import { Product } from '../../../../src/domain/entities/product'

export class ProductRepositoryStub implements GetAllProductsWithFiltersRepository {
  async getWithFilters (): Promise<Product[]> {
    return Promise.resolve([{
      id: 'any-product-id',
      name: 'Any Product',
      categorySubCategoryId: 'any-category-subcategory-id',
      variations: [{
        id: 'any-variation-id',
        price: 20,
        stock: 20,
        productId: 'any-product-id',
        color: 'Black',
        size: 'G',
        imageUrl: 'www.google.com.br'
      }]
    }])
  }
}
