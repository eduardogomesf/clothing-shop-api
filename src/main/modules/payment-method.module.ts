import { Module } from '@nestjs/common'
import { PrismaPaymentMethodRepository } from '@/infra/database/pg/prisma/repositories'
import { PaymentMethodController } from '@/presentation/controllers/payment-method.controller'
import { PrismaPaymentMethodMapper } from '@/infra/database/pg/prisma/mappers/'
import { ImpGetActivePaymentMethodsUseCase } from '@/application/use-cases/payment-method'
import { GetActivePaymentMethodsRepository } from '../../application/protocols/database/repositories/payment-method'

@Module({
  providers: [
    PrismaPaymentMethodMapper,
    PrismaPaymentMethodRepository,
    {
      provide: ImpGetActivePaymentMethodsUseCase,
      useFactory: (getActivePaymentMethodsRepository: GetActivePaymentMethodsRepository) => {
        return new ImpGetActivePaymentMethodsUseCase(getActivePaymentMethodsRepository)
      },
      inject: [PrismaPaymentMethodRepository]
    }
  ],
  controllers: [
    PaymentMethodController
  ]
})
export class PaymentMethodModule {}
