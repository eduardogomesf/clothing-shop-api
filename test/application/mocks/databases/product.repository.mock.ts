import { GetAllProductsWithFiltersRepository } from '@/application/protocols/database/repositories/product/get-all-products-with-filters.repository'
import { GetProductByIdWithVariationsRepository, GetProductByIdWithVariationsRepositoryResponse } from '../../../../src/application/protocols/database/repositories/product/get-product-by-id-with-variations.repository'
import { Product } from '../../../../src/domain/entities/product'

export class ProductRepositoryStub implements GetAllProductsWithFiltersRepository, GetProductByIdWithVariationsRepository {
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

  async getById (id: string): Promise<GetProductByIdWithVariationsRepositoryResponse> {
    return Promise.resolve({
      id: 'any-product-id',
      name: 'Any Product',
      description: 'Any product description',
      category: {
        id: 'any-category-id',
        name: 'any-category-name',
        subcategory: {
          id: 'any-subcategory-id',
          name: 'any-subcategory-name'
        }
      },
      variations: [{
        id: 'any-variation-id',
        price: 20,
        stock: 20,
        productId: 'any-product-id',
        color: 'Black',
        size: 'G',
        imageUrl: 'www.google.com.br'
      }]
    })
  }
}
