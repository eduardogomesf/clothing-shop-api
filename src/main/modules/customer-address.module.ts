import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImpAddCustomerAddressUseCase } from '@/application/use-cases/customer'
import { AddCustomerAddressController } from '@/presentation/controllers/customers'
import { PgCustomerRepository, PgCustomerAddressRepository } from '@/infra/database/pg/repositories'
import { GetCustomerByIdRepository } from '@/application/protocols/database/repositories/customer'
import { CreateCustomerAddressRepository } from '@/application/protocols/database/repositories/customer-address'
import { CustomerModel, CustomerAddressModel } from '@/infra/database/pg/models'

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
    }
  ],
  controllers: [
    AddCustomerAddressController
  ]
})
export class CustomerAddressModule {}
