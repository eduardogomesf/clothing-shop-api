import { Injectable } from '@nestjs/common'
import { GetAllProductsWithFiltersRepository, GetAllProductsWithFiltersRepositoryDTO } from '@/application/protocols/database/repositories/product'
import { prisma } from '../configs/prisma'

@Injectable()
export class PgProductRepository implements GetAllProductsWithFiltersRepository {
  async getWithFilters (filters: GetAllProductsWithFiltersRepositoryDTO): Promise<any[]> {
    return await prisma.product.findMany({ include: { variations: true } })
  }
}
