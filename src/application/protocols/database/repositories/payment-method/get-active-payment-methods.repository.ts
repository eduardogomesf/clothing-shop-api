import { PaymentMethod } from '@/domain/entities/payment-method'

export interface GetActivePaymentMethodsRepository {
  getAllActive (): Promise<PaymentMethod[]>
}
