import {
  Controller,
  HttpCode,
  InternalServerErrorException,
  Param,
  NotFoundException as HttpNotFoundException,
  UseGuards,
  Delete
} from '@nestjs/common'
import { NotFoundException } from '@/application/exceptions'
import { ImpDeleteCustomerAddressUseCase } from '@/application/use-cases/customer-address'
import { Logger } from '@/shared/utils/logger.util'
import { AuthGuard } from '../../guards/auth.guard'

@Controller('')
@UseGuards(AuthGuard)
export class DeleteOneCustomerAddressController {
  constructor(
    private readonly deleteCustomerAddressUseCase: ImpDeleteCustomerAddressUseCase
  ) {}

  @HttpCode(204)
  @Delete('/customers/:id/addresses/:addressId')
  async execute (
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
}
