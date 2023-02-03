import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { ImpGetCategoriesWithSubCategoriesUseCase } from '@/application/use-cases/category'
import { Logger } from '@/shared/utils'

@Controller('/categories')
export class CategoryController {
  constructor(
    private readonly getCategoriesWithSubcategoriesUseCase: ImpGetCategoriesWithSubCategoriesUseCase
  ) {}

  @Get('')
  async getCategories () {
    try {
      return await this.getCategoriesWithSubcategoriesUseCase.get()
    } catch (error) {
      Logger.logError('CategoryController.getCategories', error.message)
      throw new InternalServerErrorException()
    }
  }
}
