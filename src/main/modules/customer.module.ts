import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImpCreateCustomerUseCase, ImpAuthenticateCustomerUseCase } from '@/application/use-cases/customer'
import { CustomerController } from '@/presentation/controllers'
import { PgCustomerRepository } from '@/infra/database/pg/repositories'
import { BcryptAdapter, JwtAdapter } from '@/infra/utils/cryptography'
import { CreateCustomerRepository, GetCustomerByEmailRepository } from '@/application/protocols/database/repositories/customer'
import { Hasher, HashComparer, Encrypter } from '@/application/protocols/utils/cryptography/'
import { CustomerModel } from '@/infra/database/pg/models'
import { ENVS } from '../configs'

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerModel])
  ],
  providers: [
    PgCustomerRepository,
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
      inject: [PgCustomerRepository, BcryptAdapter, PgCustomerRepository]
    },
    {
      provide: JwtAdapter,
      useFactory: () => {
        return new JwtAdapter('3d', ENVS.SECRETS.JWT_SECRET)
      }
    },
    {
      provide: ImpAuthenticateCustomerUseCase,
      useFactory: (getCustomerByEmailRepository: GetCustomerByEmailRepository, hashComparer: HashComparer, encrypter: Encrypter) => {
        return new ImpAuthenticateCustomerUseCase(getCustomerByEmailRepository, hashComparer, encrypter)
      },
      inject: [PgCustomerRepository, BcryptAdapter, JwtAdapter]
    }
  ],
  controllers: [
    CustomerController
  ]
})
export class CustomerModule {}
