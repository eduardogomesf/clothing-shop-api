import { GetProductsUseCase, GetProductsUseCaseDTO } from '@/domain/use-cases/product'
import { Product } from '@/domain/entities/product'
import { GetAllProductsWithFiltersRepository } from '../../protocols/database/repositories/product'
// import { NotFoundException } from '../../exceptions'
// import {
//   GetCategorySubcategoryIdsByCategoryIdRepository,
//   GetCategorySubcategoryIdByCategoryAndSubCategoryRepository
// } from '../../protocols/database/repositories/category'

export class ImpGetProductsUseCase implements GetProductsUseCase {
  constructor(
    private readonly getAllProductsWithFiltersRepository: GetAllProductsWithFiltersRepository
    // private readonly getCategorySubcategoryIdByCategoryAndSubCategoryRepository: GetCategorySubcategoryIdByCategoryAndSubCategoryRepository,
    // private readonly getCategorySubcategoryIdsByCategoryIdRepository: GetCategorySubcategoryIdsByCategoryIdRepository
  ) {}

  async get (filters: GetProductsUseCaseDTO): Promise<Product[]> {
    const {
      itemsPerPage,
      page,
      // categoryId,
      maxPrice = 9999999999999,
      minPrice = 0,
      search = '',
      // subcategoryId,
      withoutStock
    } = filters

    const categorySubcategoryIds = []

    // if (categoryId && subcategoryId) {
    //   const categorySubcategory = await this.getCategorySubcategoryIdByCategoryAndSubCategoryRepository.getOne({ categoryId, subcategoryId })

    //   if (!categorySubcategory) {
    //     throw new NotFoundException('Category')
    //   }

    //   categorySubcategoryIds.push(categorySubcategory.id)
    // } else if (categoryId) {
    //   const categorySubcategories = await this.getCategorySubcategoryIdsByCategoryIdRepository.getAllByCategoryId(categoryId)

    //   if (categorySubcategories.length <= 0) {
    //     throw new NotFoundException('Category')
    //   }

    //   categorySubcategories.forEach(categorySubcategory => {
    //     categorySubcategoryIds.push(categorySubcategory.id)
    //   })
    // }

    const shouldGetProductsWithoutStock = !!withoutStock

    const products = await this.getAllProductsWithFiltersRepository.getWithFilters({
      limit: itemsPerPage,
      page,
      outOfStock: shouldGetProductsWithoutStock,
      minPrice,
      maxPrice,
      search,
      categorySubcategoryIds
    })

    if (products.length <= 0) {
      return []
    }

    return products
  }
}
