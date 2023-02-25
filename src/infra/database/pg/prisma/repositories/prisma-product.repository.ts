import { Injectable } from '@nestjs/common'
import {
  GetAllProductsWithFiltersRepository,
  GetAllProductsWithFiltersRepositoryDTO,
  GetAllProductsWithFiltersRepositoryResponse,
  GetProductByIdWithVariationsRepository,
  GetProductByIdWithVariationsRepositoryResponse
} from '@/application/protocols/database/repositories/product'
import { prisma } from '../configs/prisma'
import { PrismaProductMapper } from '../mappers/prisma-product.mapper'
import { PrismaProductFilter } from '../filters'

@Injectable()
export class PrismaProductRepository implements GetAllProductsWithFiltersRepository, GetProductByIdWithVariationsRepository {
  constructor(
    private readonly prismaProductMapper: PrismaProductMapper,
    private readonly productFilter: PrismaProductFilter
  ) {}

  async getWithFilters (filters: GetAllProductsWithFiltersRepositoryDTO): Promise<GetAllProductsWithFiltersRepositoryResponse[]> {
    const prismaFilters = this.productFilter
      .reset()
      .addPagination(filters.limit, filters.page)
      .addSearch(filters.search)
      .addMinPrice(filters.minPrice)
      .addMaxPrice(filters.maxPrice)
      .addCategorySubcategoryIds(filters.categorySubcategoryIds)
      .getResult()

    const result = await prisma.product.findMany({ ...prismaFilters } as any)
    return this.prismaProductMapper.mapProductsWithVariations(result as any)
  }

  async getById (id: string): Promise<GetProductByIdWithVariationsRepositoryResponse> {
    const result = await prisma.product.findFirst({
      where: { id },
      include: {
        variations: true,
        categorySubcategory: {
          include: {
            category: true,
            subcategory: true
          }
        }
      }
    })

    return this.prismaProductMapper.mapProductDetailsWithVariations(result)
  }
}
