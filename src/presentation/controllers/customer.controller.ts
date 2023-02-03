import { Controller, HttpCode, Post, BadRequestException, InternalServerErrorException, Body, UnprocessableEntityException, UnauthorizedException } from '@nestjs/common'
import { MissingParamsException, InformationAlreadyInUseException, NotFoundException } from '@/application/exceptions'
import { ImpAuthenticateCustomerUseCase, ImpCreateCustomerUseCase } from '@/application/use-cases/customer'
import { Logger } from '@/shared/utils/logger.util'
import { CreateCustomerDto, AuthenticateCustomerDto } from '../dto'

@Controller('/customers')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: ImpCreateCustomerUseCase,
    private readonly authenticateCustomerUseCase: ImpAuthenticateCustomerUseCase
  ) {}

  @HttpCode(201)
  @Post('')
  async create (@Body() body: CreateCustomerDto) {
    try {
      return await this.createCustomerUseCase.create(body)
    } catch (error) {
      Logger.logError('CreateCustomerController.execute', error.message)

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

  @HttpCode(200)
  @Post('/auth')
  async authenticate (@Body() body: AuthenticateCustomerDto) {
    try {
      return await this.authenticateCustomerUseCase.auth(body)
    } catch (error) {
      Logger.logError('AuthenticateCustomerController.execute', error.message)

      if (error instanceof NotFoundException) {
        throw new UnauthorizedException({
          message: error.message
        })
      }

      throw new InternalServerErrorException()
    }
  }
}
