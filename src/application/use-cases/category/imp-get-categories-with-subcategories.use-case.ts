import { GetCategoriesWithSubCategoriesUseCase } from '@/domain/use-cases/category/get-categories-with-subcategories.use-case'
import { Category } from '@/domain/entities/category'
import { GetCategoriesWithSubCategoriesRepository } from '../../protocols/database/repositories/category/get-categories-with-subcategories.repository'

export class ImpGetCategoriesWithSubCategoriesUseCase implements GetCategoriesWithSubCategoriesUseCase {
  constructor(
    private readonly getCategoriesWithSubCategoriesRepository: GetCategoriesWithSubCategoriesRepository
  ) {}

  async get (): Promise<Category[]> {
    const categories = await this.getCategoriesWithSubCategoriesRepository.getAll()

    if (!categories || categories.length <= 0) {
      return []
    }

    return categories
  };
}
