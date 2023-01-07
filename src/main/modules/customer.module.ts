import { Module } from '@nestjs/common';
import { ImpCreateCustomerUseCase } from '@/application/use-cases/customer/imp-create-customer.use-case';
import { CreateCustomerController } from '@/presentation/controllers/customers/create-customer.controller';
import { PgCustomerRepository } from '@/infra/database/pg/repositories/pg-customer.repository';
import { BcryptHasher } from '@/infra/utils/cryptography/bcrypt-hasher.util';
import { CreateCustomerRepository, GetCustomerByEmailRepository } from '@/application/protocols/database/repositories/customer';
import { Hasher } from '@/application/protocols/utils/cryptography/hasher.util';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from '@/infra/database/pg/models/customer.model';

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
    }
  ],
  controllers: [
    CreateCustomerController
  ]
})
export class CustomerModule {}
