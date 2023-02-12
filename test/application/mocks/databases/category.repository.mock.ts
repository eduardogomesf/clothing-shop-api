import { GetCategoriesWithSubCategoriesRepository } from '../../../../src/application/protocols/database/repositories/category/get-categories-with-subcategories.repository'
import { Category } from '../../../../src/domain/entities'

export class CategoryRepositoryStub implements GetCategoriesWithSubCategoriesRepository {
  getAll (): Promise<Category[]> {
    return Promise.resolve([
      {
        id: 'any-category-id',
        name: 'default category',
        subcategories: [{
          id: 'any-subcategory-id',
          name: 'default subcategory'
        }]
      }
    ])
  };
}
