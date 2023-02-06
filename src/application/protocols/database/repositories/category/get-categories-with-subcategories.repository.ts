import { Category } from '@/domain/entities/category'

export interface GetCategoriesWithSubCategoriesRepository {
  getAll: () => Promise<Category[]>
}
