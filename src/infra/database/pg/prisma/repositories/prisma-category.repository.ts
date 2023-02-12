import { Injectable } from '@nestjs/common'
import { GetCategoriesWithSubCategoriesRepository } from '@/application/protocols/database/repositories/category'
import { Category } from '@/domain/entities'
import { prisma } from '../configs/prisma'
import { PrismaCategoryMapper } from '../mappers/prisma-category.mapper'

@Injectable()
export class PrismaCategoryRepository implements GetCategoriesWithSubCategoriesRepository {
  constructor(
    private readonly categoryMapper: PrismaCategoryMapper
  ) {}

  async getAll (): Promise<Category[]> {
    const result = await prisma.category.findMany({ include: { categoriesSubCategories: { include: { subcategory: true } } } })
    return this.categoryMapper.mapCategories(result)
  }
}
