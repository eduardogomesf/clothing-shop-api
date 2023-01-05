import { Module } from '@nestjs/common';
import { ImpCreateCustomerUseCase } from '@/application/use-cases/customer/imp-create-customer.use-case';
import { CreateCustomerController } from '@/presentation/controllers/customers/create-customer.controller';
import { PgCustomerRepository } from '@/infra/database/pg/repositories/pg-customer.repository';
import { BcryptHasher } from '@/infra/utils/cryptography/bcrypt-hasher.util';
import { CreateCustomerRepository } from '@/application/protocols/database/repositories/customer/create-customer.repository';
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
      useFactory: (createCustomerRepository: CreateCustomerRepository, hasher: Hasher) => {
        return new ImpCreateCustomerUseCase(createCustomerRepository, hasher)
      },
      inject: [PgCustomerRepository, BcryptHasher]
    }
  ],
  controllers: [
    CreateCustomerController
  ]
})
export class CustomerModule {}
