import {
  Controller,
  HttpCode,
  Post,
  BadRequestException,
  InternalServerErrorException,
  Body,
  Param,
  NotFoundException as HttpNotFoundException
} from '@nestjs/common'
import { MissingParamsException, NotFoundException } from '@/application/exceptions'
import { ImpAddCustomerAddressUseCase } from '@/application/use-cases/customer'
import { AddCustomerAddressDTO } from '../../dto'

@Controller('')
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

      console.log(error)

      throw new InternalServerErrorException()
    }
  }
}
