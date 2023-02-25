import { PaymentMethod } from '@prisma/client'
import { PrismaBaseMapper } from './prisma-base.mapper'

export class PrismaPaymentMethodMapper extends PrismaBaseMapper {
  mapActivePaymentMethods (paymentMethods: PaymentMethod[]): PaymentMethod[] {
    return paymentMethods.map(paymentMethod => this.removeCreatedAtAndUpdatedAtProps(paymentMethod))
  }
}
