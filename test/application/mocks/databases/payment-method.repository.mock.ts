import { GetActivePaymentMethodsRepository } from '../../../../src/application/protocols/database/repositories/payment-method'
import { PaymentMethod } from '../../../../src/domain/entities/payment-method'

export class PaymentMethodRepositoryStub implements GetActivePaymentMethodsRepository {
  async getAllActive (): Promise<PaymentMethod[]> {
    return Promise.resolve([
      {
        id: 'any-payment-method-id',
        name: 'Credit Card',
        isActive: true
      }
    ])
  }
}
