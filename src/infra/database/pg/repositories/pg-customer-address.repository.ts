import { CreateCustomerAddressRepository, CreateCustomerAddressRepositoryDTO } from '@/application/protocols/database/repositories/customer'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CustomerAddress } from '../../../../domain/entities'
import { CustomerAddressModel } from '../models/customer-address.model'

@Injectable()
export class PgCustomerAddressRepository implements CreateCustomerAddressRepository {
  constructor(
    @InjectRepository(CustomerAddressModel)
    private readonly repository: Repository<CustomerAddressModel>
  ) {}

  async create (createAddress: CreateCustomerAddressRepositoryDTO): Promise<CustomerAddress> {
    const customerAddress = this.repository.create(createAddress)
    await this.repository.save(customerAddress)
    return customerAddress
  };
}
