import { Controller, HttpCode, Post, BadRequestException, InternalServerErrorException, Body } from "@nestjs/common";
import { MissingParamsException } from "@/application/exceptions/missing-params.exception";
import { CreateCustomerDto } from "../../dto/create-customer.dto";
import { ImpCreateCustomerUseCase } from "../../../application/use-cases/customer/imp-create-customer.use-case";

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

      throw new InternalServerErrorException()
    }
  }

}
