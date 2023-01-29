import { GetCategoriesWithSubCategoriesRepository } from '../../../../src/application/protocols/database/repositories/category/get-categories-with-subcategories.repository'
import { CategoryModel } from '../../../../src/infra/database/pg/models/category.model'

export class CategoryRepositoryStub implements GetCategoriesWithSubCategoriesRepository {
  getAll (): Promise<CategoryModel[]> {
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
