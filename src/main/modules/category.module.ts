import { Module } from '@nestjs/common'
import { PrismaCategoryRepository } from '@/infra/database/pg/prisma/repositories'
import { ImpGetCategoriesWithSubCategoriesUseCase } from '@/application/use-cases/category'
import { GetCategoriesWithSubCategoriesRepository } from '@/application/protocols/database/repositories/category'
import { CategoryController } from '@/presentation/controllers'

@Module({
  providers: [
    PrismaCategoryRepository,
    {
      provide: ImpGetCategoriesWithSubCategoriesUseCase,
      useFactory: (getCategoriesWithSubcategoriesRepository: GetCategoriesWithSubCategoriesRepository) => {
        return new ImpGetCategoriesWithSubCategoriesUseCase(getCategoriesWithSubcategoriesRepository)
      },
      inject: [PrismaCategoryRepository]
    }
  ],
  controllers: [
    CategoryController
  ]
})
export class CategoryModule {}
