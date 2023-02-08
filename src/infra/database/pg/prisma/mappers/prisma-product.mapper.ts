import { PrismaBaseMapper } from './prisma-base.mapper'
import { GetAllProductsWithFiltersRepositoryResponse } from '@/application/protocols/database/repositories/product'
import { Product, ProductVariation } from '@prisma/client'

export type MapProductsWithVariationsParams = Product & { variations: ProductVariation[] }

export class PrismaProductMapper extends PrismaBaseMapper {
  mapProductsWithVariations (products: MapProductsWithVariationsParams[]): GetAllProductsWithFiltersRepositoryResponse[] {
    return products.map(product => {
      const modifiedProduct: GetAllProductsWithFiltersRepositoryResponse = this.removeCreatedAtAndUpdatedAtProps(product)

      modifiedProduct.variations = modifiedProduct.variations.map(variation => {
        delete variation.productId
        return this.removeCreatedAtAndUpdatedAtProps(variation)
      })

      return modifiedProduct
    })
  }
}
