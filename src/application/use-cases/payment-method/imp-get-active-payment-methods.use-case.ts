import { GetActivePaymentMethodsUseCase } from '@/domain/use-cases/payment-method/get-active-payment-methods.use-case'
import { PaymentMethod } from '@/domain/entities/payment-method'
import { GetActivePaymentMethodsRepository } from '../../protocols/database/repositories/payment-method'

export class ImpGetActivePaymentMethodsUseCase implements GetActivePaymentMethodsUseCase {
  constructor(
    private readonly getActivePaymentMethodsRepository: GetActivePaymentMethodsRepository
  ) {}

  async getActives (): Promise<PaymentMethod[]> {
    return await this.getActivePaymentMethodsRepository.getAllActive()
  }
}
