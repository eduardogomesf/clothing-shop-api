import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImpCreateCustomerUseCase, ImpAuthenticateCustomerUseCase, ImpAddCustomerAddressUseCase } from '@/application/use-cases/customer'
import { AuthenticateCustomerController, AddCustomerAddressController, CreateCustomerController } from '@/presentation/controllers/customers'
import { PgCustomerRepository } from '@/infra/database/pg/repositories/pg-customer.repository'
import { BcryptAdapter, JwtAdapter } from '@/infra/utils/cryptography'
import { CreateCustomerAddressRepository, CreateCustomerRepository, GetCustomerByEmailRepository, GetCustomerByIdRepository } from '@/application/protocols/database/repositories/customer'
import { Hasher, HashComparer, Encrypter } from '@/application/protocols/utils/cryptography/'
import { CustomerModel } from '@/infra/database/pg/models/customer.model'
import { ENVS } from '../configs/envs'
import { CustomerAddressModel } from '@/infra/database/pg/models/customer-address.model'
import { PgCustomerAddressRepository } from '../../infra/database/pg/repositories/pg-customer-address.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerModel, CustomerAddressModel])
  ],
  providers: [
    PgCustomerRepository,
    PgCustomerAddressRepository,
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
        console.log('teste', ENVS.SECRETS.JWT_SECRET)
        return new JwtAdapter('3d', ENVS.SECRETS.JWT_SECRET)
      }
    },
    {
      provide: ImpAuthenticateCustomerUseCase,
      useFactory: (getCustomerByEmailRepository: GetCustomerByEmailRepository, hashComparer: HashComparer, encrypter: Encrypter) => {
        return new ImpAuthenticateCustomerUseCase(getCustomerByEmailRepository, hashComparer, encrypter)
      },
      inject: [PgCustomerRepository, BcryptAdapter, JwtAdapter]
    },
    {
      provide: ImpAddCustomerAddressUseCase,
      useFactory: (getCustomerByIdRepository: GetCustomerByIdRepository, createCustomerAddressRepository: CreateCustomerAddressRepository) => {
        return new ImpAddCustomerAddressUseCase(getCustomerByIdRepository, createCustomerAddressRepository)
      },
      inject: [PgCustomerRepository, PgCustomerAddressRepository]
    }
  ],
  controllers: [
    CreateCustomerController,
    AuthenticateCustomerController,
    AddCustomerAddressController
  ]
})
export class CustomerModule {}
