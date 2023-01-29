import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { ImpGetCategoriesWithSubCategoriesUseCase } from '../../../application/use-cases/category/'

@Controller('')
export class GetCategoriesWithSubcategoriesController {
  constructor(
    private readonly getCategoriesWithSubcategoriesUseCase: ImpGetCategoriesWithSubCategoriesUseCase
  ) {}

  @Get('/categories')
  async execute () {
    try {
      return await this.getCategoriesWithSubcategoriesUseCase.get()
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException()
    }
  }
}
