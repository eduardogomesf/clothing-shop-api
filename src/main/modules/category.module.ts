import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PgCategoryRepository } from '@/infra/database/pg/repositories'
import { CategoryModel, SubcategoryModel } from '@/infra/database/pg/models/'
import { ImpGetCategoriesWithSubCategoriesUseCase } from '@/application/use-cases/category'
import { GetCategoriesWithSubCategoriesRepository } from '@/application/protocols/database/repositories/category/get-categories-with-subcategories.repository'
import { GetCategoriesWithSubcategoriesController } from '@/presentation/controllers/category/get-category-with-subcategories.controller'

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
    GetCategoriesWithSubcategoriesController
  ]
})
export class CategoryModule {}
