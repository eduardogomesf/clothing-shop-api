import { Controller, HttpCode, Post, BadRequestException, InternalServerErrorException, Body, UnprocessableEntityException } from '@nestjs/common'
import { MissingParamsException, InformationAlreadyInUseException } from '@/application/exceptions'
import { ImpCreateCustomerUseCase } from '@/application/use-cases/customer'
import { CreateCustomerDto } from '../../dto'

@Controller('')
export class CreateCustomerController {
  constructor(
    private readonly createCustomerUseCase: ImpCreateCustomerUseCase
  ) {}

  @HttpCode(201)
  @Post('/customers')
  async execute (@Body() body: CreateCustomerDto) {
    try {
      return await this.createCustomerUseCase.create(body)
    } catch (error) {
      if (error instanceof MissingParamsException) {
        throw new BadRequestException({
          missingParams: error.missingParams,
          message: error.message
        })
      }

      if (error instanceof InformationAlreadyInUseException) {
        throw new UnprocessableEntityException({
          message: error.message
        })
      }

      throw new InternalServerErrorException()
    }
  }
}
