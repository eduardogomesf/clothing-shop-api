import { Module } from '@nestjs/common'
import { PrismaProductRepository } from '@/infra/database/pg/prisma/repositories'
import { ImpGetProductsUseCase } from '@/application/use-cases/product'
import { GetAllProductsWithFiltersRepository } from '@/application/protocols/database/repositories/product'
import { ProductController } from '@/presentation/controllers'
import { PrismaProductMapper } from '@/infra/database/pg/prisma/mappers/prisma-product.mapper'

@Module({
  providers: [
    PrismaProductMapper,
    PrismaProductRepository,
    {
      provide: ImpGetProductsUseCase,
      useFactory: (getAllProductsWithFiltersRepository: GetAllProductsWithFiltersRepository) => {
        return new ImpGetProductsUseCase(getAllProductsWithFiltersRepository)
      },
      inject: [PrismaProductRepository]
    }
  ],
  controllers: [
    ProductController
  ]
})
export class ProductModule {}
