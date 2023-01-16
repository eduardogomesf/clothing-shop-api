import { Controller, Get, InternalServerErrorException, Param, UseGuards } from '@nestjs/common'
import { ImpGetCustomerAddressesUseCase } from '@/application/use-cases/customer-address'
import { AuthGuard } from '../../guards/auth.guard'

@Controller('')
@UseGuards(AuthGuard)
export class GetCustomerAddressesController {
  constructor(
    private readonly getCustomerAddressesUseCase: ImpGetCustomerAddressesUseCase
  ) {}

  @Get('/customer/:id/addresses')
  async execute (@Param('id') customerId: string) {
    try {
      return await this.getCustomerAddressesUseCase.getAll(customerId)
    } catch {
      throw new InternalServerErrorException()
    }
  }
}
