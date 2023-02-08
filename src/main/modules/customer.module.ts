import { Module } from '@nestjs/common'
import { ImpCreateCustomerUseCase, ImpAuthenticateCustomerUseCase } from '@/application/use-cases/customer'
import { CustomerController } from '@/presentation/controllers'
import { PrismaCustomerRepository } from '@/infra/database/pg/prisma/repositories'
import { BcryptAdapter, JwtAdapter } from '@/infra/utils/cryptography'
import { CreateCustomerRepository, GetCustomerByEmailRepository } from '@/application/protocols/database/repositories/customer'
import { Hasher, HashComparer, Encrypter } from '@/application/protocols/utils/cryptography/'
import { ENVS } from '../configs'

@Module({
  providers: [
    PrismaCustomerRepository,
    {
      provide: BcryptAdapter,
      useFactory: () => {
        return new BcryptAdapter(8)
      }
    },
    {
      provide: ImpCreateCustomerUseCase,
      useFactory: (createCustomerRepository: CreateCustomerRepository, hasher: Hasher, getCustomerByEmailRepository: GetCustomerByEmailRepository) => {
        return new ImpCreateCustomerUseCase(createCustomerRepository, hasher, getCustomerByEmailRepository)
      },
      inject: [PrismaCustomerRepository, BcryptAdapter, PrismaCustomerRepository]
    },
    {
      provide: JwtAdapter,
      useFactory: () => {
        return new JwtAdapter(ENVS.JWT.EXPIRATION_IN_DAYS, ENVS.JWT.SECRET)
      }
    },
    {
      provide: ImpAuthenticateCustomerUseCase,
      useFactory: (getCustomerByEmailRepository: GetCustomerByEmailRepository, hashComparer: HashComparer, encrypter: Encrypter) => {
        return new ImpAuthenticateCustomerUseCase(getCustomerByEmailRepository, hashComparer, encrypter)
      },
      inject: [PrismaCustomerRepository, BcryptAdapter, JwtAdapter]
    }
  ],
  controllers: [
    CustomerController
  ]
})
export class CustomerModule {}
