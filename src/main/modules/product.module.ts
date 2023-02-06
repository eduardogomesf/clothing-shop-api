import { Module } from '@nestjs/common'
import { PgProductRepository } from '@/infra/database/pg/prisma/repositories'
import { ImpGetProductsUseCase } from '@/application/use-cases/product'
import { GetAllProductsWithFiltersRepository } from '@/application/protocols/database/repositories/product'
import { ProductController } from '@/presentation/controllers'

@Module({
  providers: [
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
