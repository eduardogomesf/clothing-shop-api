import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { ImpGetProductsUseCase } from '@/application/use-cases/product/imp-get-products.use-case'
import { Logger } from '@/shared/utils/logger.util'

@Controller('')
export class GetProductsController {
  constructor(
    private readonly getProductsUseCase: ImpGetProductsUseCase
  ) {}

  @Get('/products')
  async execute () {
    try {
      return await this.getProductsUseCase.get()
    } catch (error) {
      Logger.logError('GetProductsController.execute', error.message)
      throw new InternalServerErrorException()
    }
  }
}
