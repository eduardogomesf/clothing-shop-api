import { Injectable } from '@nestjs/common'
import { GetCategoriesWithSubCategoriesRepository } from '@/application/protocols/database/repositories/category'
import { Category } from '@prisma/client'
import { prisma } from '../configs/prisma'

@Injectable()
export class PrismaCategoryRepository implements GetCategoriesWithSubCategoriesRepository {
  async getAll (): Promise<Category[]> {
    return await prisma.category.findMany()
  }
}
