import { Controller, Get, InternalServerErrorException, NotFoundException as HttpNotFoundException, Param, Query } from '@nestjs/common'
import { ImpGetProductsUseCase, ImpGetProductDetailsByIdUseCase } from '@/application/use-cases/product'
import { Logger } from '@/shared/utils/logger.util'
import { NotFoundException } from '../../application/exceptions'
import { GetProductsQueryParams } from '../dto/get-products-query-params.dto'

@Controller('/products')
export class ProductController {
  constructor(
    private readonly getProductsUseCase: ImpGetProductsUseCase,
    private readonly getProductDetailsByIdUseCase: ImpGetProductDetailsByIdUseCase
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

  @Get(':id')
  async getProductDetailsById (@Param('id') id: string) {
    try {
      return this.getProductDetailsByIdUseCase.getOneById(id)
    } catch (error) {
      Logger.logError('ProductController.getProductDetailsById', error)

      if (error instanceof NotFoundException) {
        throw new HttpNotFoundException({
          message: error.message
        })
      }

      throw new InternalServerErrorException()
    }
  }
}
