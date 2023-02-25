import { PrismaBaseMapper } from './prisma-base.mapper'
import { GetAllProductsWithFiltersRepositoryResponse, GetProductByIdWithVariationsRepositoryResponse } from '@/application/protocols/database/repositories/product'
import { Product, ProductVariation, CategorySubCategory, Category, SubCategory } from '@prisma/client'

export type MapProductsWithVariationsParams = Product & { variations: ProductVariation[] }

export type MapProductDetaihsWithVariations = Product & {
  variations: ProductVariation[];
  categorySubcategory: CategorySubCategory & {
    category: Category;
    subcategory: SubCategory;
  };
}

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

  mapProductDetailsWithVariations (product: MapProductDetaihsWithVariations): GetProductByIdWithVariationsRepositoryResponse {
    if (!product) return null

    const { categorySubcategory, id, name, description, variations } = product

    const category = {
      id: categorySubcategory.category.id,
      name: categorySubcategory.category.name,
      subcategory: {
        id: categorySubcategory.subcategory.id,
        name: categorySubcategory.subcategory.name
      }
    }

    const mappedProduct: GetProductByIdWithVariationsRepositoryResponse = {
      id,
      name,
      description,
      category,
      variations: variations.map(variation => {
        return {
          id: variation.id,
          price: variation.price,
          stock: variation.stock,
          color: variation.color,
          imageUrl: variation.imageUrl,
          size: variation.size
        }
      })
    }

    return mappedProduct
  }
}
