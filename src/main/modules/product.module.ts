import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductModel, ProductVariationModel } from '@/infra/database/pg/typeorm/models/'
import { PgProductRepository } from '@/infra/database/pg/typeorm/repositories'
import { ImpGetProductsUseCase } from '@/application/use-cases/product'
import { GetAllProductsWithFiltersRepository } from '@/application/protocols/database/repositories/product'
import { ProductController } from '@/presentation/controllers'

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
    ProductController
  ]
})
export class ProductModule {}
