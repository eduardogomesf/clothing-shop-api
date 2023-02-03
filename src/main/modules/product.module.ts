import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModel, ProductVariationModel } from '@/infra/database/pg/models/'
import { PgProductRepository } from '@/infra/database/pg/repositories'
import { ImpGetProductsUseCase } from '@/application/use-cases/product'
import { GetAllProductsWithFiltersRepository } from '@/application/protocols/database/repositories/customer-address/get-all-products-with-filters.repository'
import { GetProductsController } from '@/presentation/controllers/product'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductModel, ProductVariationModel])
  ],
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
    GetProductsController
  ]
})
export class ProductModule {}
