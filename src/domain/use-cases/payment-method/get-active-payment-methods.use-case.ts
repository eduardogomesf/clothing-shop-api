import { PaymentMethod } from '../../entities/payment-method'

export interface GetActivePaymentMethodsUseCase {
  getActives (): Promise<PaymentMethod[]>
}
