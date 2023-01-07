import { Controller, HttpCode, Post, InternalServerErrorException, Body, UnauthorizedException } from "@nestjs/common";
import { NotFoundException } from "@/application/exceptions";
import { ImpAuthenticateCustomerUseCase } from "@/application/use-cases/customer/imp-authenticate-customer.use-case";
import { AuthenticateCustomerDto } from "../../dto/authenticate-customer.dto";

@Controller('')
export class AuthenticateCustomerController {
  constructor(
    private readonly authenticateCustomerUseCase: ImpAuthenticateCustomerUseCase
  ) {}

  @HttpCode(200)
  @Post('/customers/auth')
  async execute (@Body() body: AuthenticateCustomerDto) {
    try {
      return await this.authenticateCustomerUseCase.auth(body)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException({
          message: error.message
        })
      }

      throw new InternalServerErrorException()
    }
  }

}
