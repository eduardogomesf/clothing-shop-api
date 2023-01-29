import {
  Controller,
  HttpCode,
  Post,
  BadRequestException,
  InternalServerErrorException,
  Body,
  Param,
  NotFoundException as HttpNotFoundException,
  UseGuards
} from '@nestjs/common'
import { MissingParamsException, NotFoundException } from '@/application/exceptions'
import { ImpAddCustomerAddressUseCase } from '@/application/use-cases/customer-address'
import { Logger } from '@/shared/utils/logger.util'
import { AddCustomerAddressDTO } from '../../dto'
import { AuthGuard } from '../../guards/auth.guard'

@Controller('')
@UseGuards(AuthGuard)
export class AddCustomerAddressController {
  constructor(
    private readonly addCustomerAddressUseCase: ImpAddCustomerAddressUseCase
  ) {}

  @HttpCode(201)
  @Post('/customers/:id/addresses')
  async execute (@Body() body: AddCustomerAddressDTO, @Param('id') customerId: string) {
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
}
