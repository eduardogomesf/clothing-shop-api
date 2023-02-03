import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { ImpGetProductsUseCase } from '@/application/use-cases/product'
import { Logger } from '@/shared/utils/logger.util'

@Controller('/products')
export class ProductController {
  constructor(
    private readonly getProductsUseCase: ImpGetProductsUseCase
  ) {}

  @Get('')
  async getProducts () {
    try {
      return await this.getProductsUseCase.get()
    } catch (error) {
      Logger.logError('ProductController.getProducts', error.message)
      throw new InternalServerErrorException()
    }
  }
}
