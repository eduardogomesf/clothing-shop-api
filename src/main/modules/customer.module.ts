import { Module } from '@nestjs/common'
import { ImpCreateCustomerUseCase } from '@/application/use-cases/customer/imp-create-customer.use-case'
import { CreateCustomerController } from '@/presentation/controllers/customers/create-customer.controller'
import { PgCustomerRepository } from '@/infra/database/pg/repositories/pg-customer.repository'
import { BcryptHasher } from '@/infra/utils/cryptography/bcrypt-hasher.util'
import { CreateCustomerRepository, GetCustomerByEmailRepository } from '@/application/protocols/database/repositories/customer'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Hasher, HashComparer, Encrypter } from '@/application/protocols/utils/cryptography/'
import { CustomerModel } from '@/infra/database/pg/models/customer.model'
import { JwtAdapter } from '@/infra/utils/cryptography'
import { AuthenticateCustomerController } from '@/presentation/controllers/customers/authenticate-customer.controller'
import { ImpAuthenticateCustomerUseCase } from '@/application/use-cases/customer/imp-authenticate-customer.use-case'
import { ENVS } from '../configs/envs'

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerModel])
  ],
  providers: [
    PgCustomerRepository,
    {
      provide: BcryptHasher,
      useFactory: () => {
        return new BcryptHasher(8)
      }
    },
    {
      provide: ImpCreateCustomerUseCase,
      useFactory: (createCustomerRepository: CreateCustomerRepository, hasher: Hasher, getCustomerByEmailRepository: GetCustomerByEmailRepository) => {
        return new ImpCreateCustomerUseCase(createCustomerRepository, hasher, getCustomerByEmailRepository)
      },
      inject: [PgCustomerRepository, BcryptHasher, PgCustomerRepository]
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
      inject: [PgCustomerRepository, BcryptHasher, JwtAdapter]
    }
  ],
  controllers: [
    CreateCustomerController,
    AuthenticateCustomerController
  ]
})
export class CustomerModule {}
