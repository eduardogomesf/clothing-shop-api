import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { ImpGetCategoriesWithSubCategoriesUseCase } from '@/application/use-cases/category/'
import { Logger } from '@/shared/utils/logger.util'

@Controller('')
export class GetCategoriesWithSubcategoriesController {
  constructor(
    private readonly getCategoriesWithSubcategoriesUseCase: ImpGetCategoriesWithSubCategoriesUseCase
  ) {}

  @Get('/categories')
  async execute () {
    try {
      return await this.getCategoriesWithSubcategoriesUseCase.get()
    } catch (error) {
      Logger.logError('GetCategoriesWithSubcategoriesController.execute', error.message)
      throw new InternalServerErrorException()
    }
  }
}
