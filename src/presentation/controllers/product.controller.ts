import { Controller, Get, InternalServerErrorException, NotFoundException as HttpNotFoundException, Query } from '@nestjs/common'
import { ImpGetProductsUseCase } from '@/application/use-cases/product'
import { Logger } from '@/shared/utils/logger.util'
import { NotFoundException } from '../../application/exceptions'
import { GetProductsQueryParams } from '../dto/get-products-query-params.dto'

@Controller('/products')
export class ProductController {
  constructor(
    private readonly getProductsUseCase: ImpGetProductsUseCase
  ) {}

  @Get('')
  async getProducts (@Query() query: GetProductsQueryParams) {
    try {
      return await this.getProductsUseCase.get(query)
    } catch (error) {
      Logger.logError('ProductController.getProducts', error)

      if (error instanceof NotFoundException) {
        throw new HttpNotFoundException({
          message: error.message
        })
      }

      throw new InternalServerErrorException()
    }
  }
}
