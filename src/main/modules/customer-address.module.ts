import { Module } from '@nestjs/common'
import {
  ImpAddCustomerAddressUseCase,
  ImpDeleteCustomerAddressUseCase,
  ImpGetCustomerAddressesUseCase
} from '@/application/use-cases/customer-address'
import { PgCustomerRepository, PgCustomerAddressRepository } from '@/infra/database/pg/prisma/repositories'
import { GetCustomerByIdRepository } from '@/application/protocols/database/repositories/customer'
import {
  CreateCustomerAddressRepository,
  DeleteOneCustomerAddressRepository,
  GetCustomerAddressesRepository,
  GetOneCustomerAddressRepository
} from '@/application/protocols/database/repositories/customer-address'
import { CustomerAddressController } from '@/presentation/controllers'

@Module({
  providers: [
    PgCustomerRepository,
    PgCustomerAddressRepository,
    {
      provide: ImpAddCustomerAddressUseCase,
      useFactory: (getCustomerByIdRepository: GetCustomerByIdRepository, createCustomerAddressRepository: CreateCustomerAddressRepository) => {
        return new ImpAddCustomerAddressUseCase(getCustomerByIdRepository, createCustomerAddressRepository)
      },
      inject: [PgCustomerRepository, PgCustomerAddressRepository]
    },
    {
      provide: ImpGetCustomerAddressesUseCase,
      useFactory: (getCustomerAddressesRepository: GetCustomerAddressesRepository) => {
        return new ImpGetCustomerAddressesUseCase(getCustomerAddressesRepository)
      },
      inject: [PgCustomerAddressRepository]
    },
    {
      provide: ImpDeleteCustomerAddressUseCase,
      useFactory: (getOneCustomerAddressRepository: GetOneCustomerAddressRepository, deleteOneCustomerAddressRepository: DeleteOneCustomerAddressRepository) => {
        return new ImpDeleteCustomerAddressUseCase(getOneCustomerAddressRepository, deleteOneCustomerAddressRepository)
      },
      inject: [PgCustomerAddressRepository, PgCustomerAddressRepository]
    }
  ],
  controllers: [
    CustomerAddressController
  ]
})
export class CustomerAddressModule {}
