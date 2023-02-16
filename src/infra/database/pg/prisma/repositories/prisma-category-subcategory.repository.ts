import { GetCategorySubcategoryIdByCategoryAndSubCategoryRepository, GetCategorySubcategoryIdByCategoryAndSubCategoryRepositoryDTO, GetCategorySubcategoryIdsByCategoryIdRepository } from '@/application/protocols/database/repositories/category'
import { prisma } from '../configs/prisma'

export class PrismaCategorySubcategoryRepository implements GetCategorySubcategoryIdByCategoryAndSubCategoryRepository, GetCategorySubcategoryIdsByCategoryIdRepository {
  async getAllByCategoryId (categoryId: string): Promise<{ id: string; }[]> {
    return await prisma.categorySubCategory.findMany({
      where: { categoryId },
      select: { id: true }
    })
  }

  async getOne (dto: GetCategorySubcategoryIdByCategoryAndSubCategoryRepositoryDTO): Promise<{ id: string; }> {
    return await prisma.categorySubCategory.findFirst({
      where: {
        categoryId: dto.categoryId,
        subcategoryId: dto.subcategoryId
      }
    })
  }
}
