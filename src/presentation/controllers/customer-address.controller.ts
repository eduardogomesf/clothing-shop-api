import {
  Controller,
  HttpCode,
  Post,
  BadRequestException,
  InternalServerErrorException,
  Body,
  Param,
  NotFoundException as HttpNotFoundException,
  UseGuards,
  Delete,
  Get
} from '@nestjs/common'
import { MissingParamsException, NotFoundException } from '@/application/exceptions'
import { ImpAddCustomerAddressUseCase, ImpDeleteCustomerAddressUseCase, ImpGetCustomerAddressesUseCase } from '@/application/use-cases/customer-address'
import { Logger } from '@/shared/utils/logger.util'
import { AddCustomerAddressDTO } from '../dto'
import { AuthGuard } from '../guards/auth.guard'

@Controller('/customers')
@UseGuards(AuthGuard)
export class CustomerAddressController {
  constructor(
    private readonly addCustomerAddressUseCase: ImpAddCustomerAddressUseCase,
    private readonly deleteCustomerAddressUseCase: ImpDeleteCustomerAddressUseCase,
    private readonly getCustomerAddressesUseCase: ImpGetCustomerAddressesUseCase
  ) {}

  @HttpCode(201)
  @Post(':id/addresses')
  async createAddress (
    @Body() body: AddCustomerAddressDTO,
    @Param('id') customerId: string
  ) {
    try {
      return await this.addCustomerAddressUseCase.add(body, customerId)
    } catch (error) {
      Logger.logError('AddCustomerAddressController.execute', error.message)

      if (error instanceof MissingParamsException) {
        throw new BadRequestException({
          missingParams: error.missingParams,
          message: error.message
        })
      }

      if (error instanceof NotFoundException) {
        throw new HttpNotFoundException({
          message: error.message
        })
      }

      throw new InternalServerErrorException()
    }
  }

  @HttpCode(204)
  @Delete(':id/addresses/:addressId')
  async deleteAddress (
    @Param('id') customerId: string,
    @Param('addressId') addressId: string
  ) {
    try {
      return await this.deleteCustomerAddressUseCase.deleteOne({ customerId, addressId })
    } catch (error) {
      Logger.logError('DeleteOneCustomerAddressController.execute', error.message)

      if (error instanceof NotFoundException) {
        throw new HttpNotFoundException({
          message: error.message
        })
      }

      throw new InternalServerErrorException()
    }
  }

  @Get(':id/addresses')
  async getAll (@Param('id') customerId: string) {
    try {
      return await this.getCustomerAddressesUseCase.getAll(customerId)
    } catch (error) {
      Logger.logError('GetCustomerAddressesController.execute', error.message)
      throw new InternalServerErrorException()
    }
  }
}
