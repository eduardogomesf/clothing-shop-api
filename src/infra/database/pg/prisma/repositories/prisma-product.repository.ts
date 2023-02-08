import { Injectable } from '@nestjs/common'
import { GetAllProductsWithFiltersRepository, GetAllProductsWithFiltersRepositoryDTO, GetAllProductsWithFiltersRepositoryResponse } from '@/application/protocols/database/repositories/product'
import { prisma } from '../configs/prisma'
import { PrismaProductMapper } from '../mappers/prisma-product.mapper'

@Injectable()
export class PrismaProductRepository implements GetAllProductsWithFiltersRepository {
  constructor(
    private readonly prismaProductMapper: PrismaProductMapper
  ) {}

  async getWithFilters (filters: GetAllProductsWithFiltersRepositoryDTO): Promise<GetAllProductsWithFiltersRepositoryResponse[]> {
    const result = await prisma.product.findMany({ include: { variations: true } })
    return this.prismaProductMapper.mapProductsWithVariations(result)
  }
}
