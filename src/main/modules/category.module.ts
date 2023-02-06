import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PgCategoryRepository } from '@/infra/database/pg/typeorm/repositories'
import { CategoryModel, SubcategoryModel } from '@/infra/database/pg/typeorm/models/'
import { ImpGetCategoriesWithSubCategoriesUseCase } from '@/application/use-cases/category'
import { GetCategoriesWithSubCategoriesRepository } from '@/application/protocols/database/repositories/category'
import { CategoryController } from '@/presentation/controllers'

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryModel, SubcategoryModel])
  ],
  providers: [
    PgCategoryRepository,
    {
      provide: ImpGetCategoriesWithSubCategoriesUseCase,
      useFactory: (getCategoriesWithSubcategoriesRepository: GetCategoriesWithSubCategoriesRepository) => {
        return new ImpGetCategoriesWithSubCategoriesUseCase(getCategoriesWithSubcategoriesRepository)
      },
      inject: [PgCategoryRepository]
    }
  ],
  controllers: [
    CategoryController
  ]
})
export class CategoryModule {}
