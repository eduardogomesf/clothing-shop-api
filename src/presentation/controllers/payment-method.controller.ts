import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { ImpGetActivePaymentMethodsUseCase } from '@/application/use-cases/payment-method'
import { Logger } from '@/shared/utils'

@Controller('/payment-methods')
export class PaymentMethodController {
  constructor(
    private readonly getActivePaymentMethodsUseCase: ImpGetActivePaymentMethodsUseCase
  ) {}

  @Get('/active')
  async getActives () {
    try {
      return await this.getActivePaymentMethodsUseCase.getActives()
    } catch (error) {
      Logger.logError('PaymentMethodController.getActives', error)
      throw new InternalServerErrorException()
    }
  }
}
