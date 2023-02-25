import { Injectable } from '@nestjs/common'
import { GetActivePaymentMethodsRepository } from '@/application/protocols/database/repositories/payment-method'
import { PaymentMethod } from '@/domain/entities/payment-method'
import { prisma } from '../configs/prisma'
import { PrismaPaymentMethodMapper } from '../mappers'

@Injectable()
export class PrismaPaymentMethodRepository implements GetActivePaymentMethodsRepository {
  constructor(
    private readonly prismaPaymentMethodMapper: PrismaPaymentMethodMapper
  ) {}

  async getAllActive (): Promise<PaymentMethod[]> {
    const result = await prisma.paymentMethod.findMany({ where: { isActive: true } })
    return this.prismaPaymentMethodMapper.mapActivePaymentMethods(result)
  }
}
