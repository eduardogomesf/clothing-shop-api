import { CategoryModel } from '@/infra/database/pg/models/category.model'

export interface GetCategoriesWithSubCategoriesRepository {
  getAll: () => Promise<CategoryModel[]>
}
