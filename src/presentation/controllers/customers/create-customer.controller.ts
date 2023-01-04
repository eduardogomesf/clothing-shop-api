import { Controller, HttpCode, Post, BadRequestException, InternalServerErrorException, Body } from "@nestjs/common";
import { CreateCustomerUseCase } from "@/domain/use-cases/customer/create-customer.use-case";
import { MissingParamsException } from "@/application/exceptions/missing-params.exception";
import { CreateCustomerDto } from "../../dto/create-customer.dto";

@Controller('')
export class CreateCustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase
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

      throw new InternalServerErrorException()
    }
  }

}
