import { Module } from '@nestjs/common'
import { ImpCreateCustomerUseCase, ImpAuthenticateCustomerUseCase } from '@/application/use-cases/customer'
import { CreateCustomerController } from '@/presentation/controllers/customers/create-customer.controller'
import { PgCustomerRepository } from '@/infra/database/pg/repositories/pg-customer.repository'
import { BcryptAdapter } from '@/infra/utils/cryptography/bcrypt-adapter.util'
import { CreateCustomerRepository, GetCustomerByEmailRepository } from '@/application/protocols/database/repositories/customer'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Hasher, HashComparer, Encrypter } from '@/application/protocols/utils/cryptography/'
import { CustomerModel } from '@/infra/database/pg/models/customer.model'
import { JwtAdapter } from '@/infra/utils/cryptography'
import { AuthenticateCustomerController } from '@/presentation/controllers/customers/authenticate-customer.controller'
import { ENVS } from '../configs/envs'

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
    CreateCustomerController,
    AuthenticateCustomerController
  ]
})
export class CustomerModule {}
