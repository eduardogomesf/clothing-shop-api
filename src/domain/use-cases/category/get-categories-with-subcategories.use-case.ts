import { Category } from '../../entities/category'

export interface GetCategoriesWithSubCategoriesUseCase {
  get: () => Promise<Category[]>
}
