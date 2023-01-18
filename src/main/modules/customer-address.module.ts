import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  ImpAddCustomerAddressUseCase,
  ImpDeleteCustomerAddressUseCase,
  ImpGetCustomerAddressesUseCase
} from '@/application/use-cases/customer-address'
import {
  AddCustomerAddressController,
  GetCustomerAddressesController,
  DeleteOneCustomerAddressController
} from '@/presentation/controllers/customer-address'
import { PgCustomerRepository, PgCustomerAddressRepository } from '@/infra/database/pg/repositories'
import { GetCustomerByIdRepository } from '@/application/protocols/database/repositories/customer'
import {
  CreateCustomerAddressRepository,
  DeleteOneCustomerAddressRepository,
  GetCustomerAddressesRepository,
  GetOneCustomerAddressRepository
} from '@/application/protocols/database/repositories/customer-address'
import {
  CustomerModel,
  CustomerAddressModel
} from '@/infra/database/pg/models'

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerModel, CustomerAddressModel])
  ],
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
    AddCustomerAddressController,
    GetCustomerAddressesController,
    DeleteOneCustomerAddressController
  ]
})
export class CustomerAddressModule {}
