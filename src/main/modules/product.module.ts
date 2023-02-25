import { Module } from '@nestjs/common'
import { PrismaProductRepository, PrismaCategorySubcategoryRepository } from '@/infra/database/pg/prisma/repositories'
import { ImpGetProductDetailsByIdUseCase, ImpGetProductsUseCase } from '@/application/use-cases/product'
import { GetAllProductsWithFiltersRepository, GetProductByIdWithVariationsRepository } from '@/application/protocols/database/repositories/product'
import { ProductController } from '@/presentation/controllers'
import { PrismaProductMapper } from '@/infra/database/pg/prisma/mappers'
import { PrismaProductFilter } from '@/infra/database/pg/prisma/filters'
import {
  GetCategorySubcategoryIdByCategoryAndSubCategoryRepository,
  GetCategorySubcategoryIdsByCategoryIdRepository
} from '@/application/protocols/database/repositories/category'

@Module({
  providers: [
    PrismaProductMapper,
    PrismaProductFilter,
    PrismaProductRepository,
    PrismaCategorySubcategoryRepository,
    {
      provide: ImpGetProductsUseCase,
      useFactory: (
        getAllProductsWithFiltersRepository: GetAllProductsWithFiltersRepository,
        getCategorySubcategoryIdByCategoryAndSubCategoryRepository: GetCategorySubcategoryIdByCategoryAndSubCategoryRepository,
        getCategorySubcategoryIdsByCategoryIdRepository: GetCategorySubcategoryIdsByCategoryIdRepository
      ) => {
        return new ImpGetProductsUseCase(
          getAllProductsWithFiltersRepository,
          getCategorySubcategoryIdByCategoryAndSubCategoryRepository,
          getCategorySubcategoryIdsByCategoryIdRepository
        )
      },
      inject: [PrismaProductRepository, PrismaCategorySubcategoryRepository, PrismaCategorySubcategoryRepository]
    },
    {
      provide: ImpGetProductDetailsByIdUseCase,
      useFactory: (getProductByIdWithVariationsRepository: GetProductByIdWithVariationsRepository) => {
        return new ImpGetProductDetailsByIdUseCase(getProductByIdWithVariationsRepository)
      },
      inject: [PrismaProductRepository]
    }
  ],
  controllers: [
    ProductController
  ]
})
export class ProductModule {}
