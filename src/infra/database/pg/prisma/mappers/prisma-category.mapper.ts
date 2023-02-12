import { PrismaBaseMapper } from './prisma-base.mapper'
import { Category as PrismaCategory, CategorySubCategory as PrismaCategorySubCategory, SubCategory as PrismaSubcategory } from '@prisma/client'
import { Category } from '@/domain/entities'

type CategorySubCategoryWithSubcategory = PrismaCategorySubCategory & { subcategory: PrismaSubcategory }

export type MapCategoriesWithSubcategoriesParams = PrismaCategory & { categoriesSubCategories: CategorySubCategoryWithSubcategory[] }

export class PrismaCategoryMapper extends PrismaBaseMapper {
  mapCategories (categories: MapCategoriesWithSubcategoriesParams[]): Category[] {
    return categories.map(category => {
      const modifiedCategory: Category = this.removeCreatedAtAndUpdatedAtProps(category)

      modifiedCategory.subcategories = category.categoriesSubCategories.map(categorySubcategory => {
        const { id, name, description } = categorySubcategory.subcategory

        return {
          id,
          name,
          description
        }
      })

      return {
        id: modifiedCategory.id,
        name: modifiedCategory.name,
        description: modifiedCategory.description,
        subcategories: modifiedCategory.subcategories
      }
    })
  }
}
