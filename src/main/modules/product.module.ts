import { Module } from '@nestjs/common'
import { PgProductRepository } from '@/infra/database/pg/prisma/repositories'
import { ImpGetProductsUseCase } from '@/application/use-cases/product'
import { GetAllProductsWithFiltersRepository } from '@/application/protocols/database/repositories/product'
import { ProductController } from '@/presentation/controllers'
import { PrismaProductMapper } from '@/infra/database/pg/prisma/mappers/prisma-product.mapper'

@Module({
  providers: [
    PrismaProductMapper,
    PgProductRepository,
    {
      provide: ImpGetProductsUseCase,
      useFactory: (getAllProductsWithFiltersRepository: GetAllProductsWithFiltersRepository) => {
        return new ImpGetProductsUseCase(getAllProductsWithFiltersRepository)
      },
      inject: [PgProductRepository]
    }
  ],
  controllers: [
    ProductController
  ]
})
export class ProductModule {}
