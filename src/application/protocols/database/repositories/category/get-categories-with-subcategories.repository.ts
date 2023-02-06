import { CategoryModel } from '@/infra/database/pg/typeorm/models/category.model'

export interface GetCategoriesWithSubCategoriesRepository {
  getAll: () => Promise<CategoryModel[]>
}
