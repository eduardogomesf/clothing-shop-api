import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PgCategoryRepository } from '@/infra/database/pg/repositories'
import { CategoryModel, SubcategoryModel } from '@/infra/database/pg/models/'
import { ImpGetCategoriesWithSubCategoriesUseCase } from '@/application/use-cases/category'
import { GetCategoriesWithSubCategoriesRepository } from '@/application/protocols/database/repositories/category/get-categories-with-subcategories.repository'
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
