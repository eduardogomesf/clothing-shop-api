import { GetCategoriesWithSubCategoriesUseCase } from '@/domain/use-cases/category'
import { Category } from '@/domain/entities/category'
import { GetCategoriesWithSubCategoriesRepository } from '../../protocols/database/repositories/category'

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
