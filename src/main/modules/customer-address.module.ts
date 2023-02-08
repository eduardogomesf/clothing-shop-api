import { Module } from '@nestjs/common'
import {
  ImpAddCustomerAddressUseCase,
  ImpDeleteCustomerAddressUseCase,
  ImpGetCustomerAddressesUseCase
} from '@/application/use-cases/customer-address'
import { PrismaCustomerRepository, PrismaCustomerAddressRepository } from '@/infra/database/pg/prisma/repositories'
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
    PrismaCustomerRepository,
    PrismaCustomerAddressRepository,
    {
      provide: ImpAddCustomerAddressUseCase,
      useFactory: (getCustomerByIdRepository: GetCustomerByIdRepository, createCustomerAddressRepository: CreateCustomerAddressRepository) => {
        return new ImpAddCustomerAddressUseCase(getCustomerByIdRepository, createCustomerAddressRepository)
      },
      inject: [PrismaCustomerRepository, PrismaCustomerAddressRepository]
    },
    {
      provide: ImpGetCustomerAddressesUseCase,
      useFactory: (getCustomerAddressesRepository: GetCustomerAddressesRepository) => {
        return new ImpGetCustomerAddressesUseCase(getCustomerAddressesRepository)
      },
      inject: [PrismaCustomerAddressRepository]
    },
    {
      provide: ImpDeleteCustomerAddressUseCase,
      useFactory: (getOneCustomerAddressRepository: GetOneCustomerAddressRepository, deleteOneCustomerAddressRepository: DeleteOneCustomerAddressRepository) => {
        return new ImpDeleteCustomerAddressUseCase(getOneCustomerAddressRepository, deleteOneCustomerAddressRepository)
      },
      inject: [PrismaCustomerAddressRepository, PrismaCustomerAddressRepository]
    }
  ],
  controllers: [
    CustomerAddressController
  ]
})
export class CustomerAddressModule {}
