import {
  GetCategorySubcategoryIdByCategoryAndSubCategoryRepository,
  GetCategorySubcategoryIdByCategoryAndSubCategoryRepositoryDTO,
  GetCategorySubcategoryIdsByCategoryIdRepository
} from '../../../../src/application/protocols/database/repositories/category'

export class CategorySubcategoryRepositoryStub implements GetCategorySubcategoryIdByCategoryAndSubCategoryRepository, GetCategorySubcategoryIdsByCategoryIdRepository {
  getAllByCategoryId (categoryId: string): Promise<{ id: string; }[]> {
    return Promise.resolve([
      {
        id: 'any-category-subcategory-id'
      },
      {
        id: 'any-category-subcategory-id-2'
      }
    ])
  }

  getOne (dto: GetCategorySubcategoryIdByCategoryAndSubCategoryRepositoryDTO): Promise<{ id: string; }> {
    return Promise.resolve({
      id: 'any-category-subcategory-id'
    })
  }
}
