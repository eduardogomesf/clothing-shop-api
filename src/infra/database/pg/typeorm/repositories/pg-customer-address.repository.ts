import {
  CreateCustomerAddressRepository,
  CreateCustomerAddressRepositoryDTO,
  DeleteOneCustomerAddressRepository,
  DeleteOneCustomerAddressRepositoryDTO,
  GetCustomerAddressesRepository,
  GetOneCustomerAddressRepository,
  GetOneCustomerAddressRepositoryDTO
} from '@/application/protocols/database/repositories/customer-address'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CustomerAddress } from '@/domain/entities'
import { CustomerAddressModel } from '../models/customer-address.model'

@Injectable()
export class PgCustomerAddressRepository implements
  CreateCustomerAddressRepository, GetCustomerAddressesRepository,
  GetOneCustomerAddressRepository, DeleteOneCustomerAddressRepository {
  constructor(
    @InjectRepository(CustomerAddressModel)
    private readonly repository: Repository<CustomerAddressModel>
  ) {}

  async create (createAddress: CreateCustomerAddressRepositoryDTO): Promise<CustomerAddress> {
    const customerAddress = this.repository.create(createAddress)
    await this.repository.save(customerAddress)
    return customerAddress
  };

  async getAllByCustomerId (customerId: string): Promise<CustomerAddress[]> {
    return await this.repository.find({ where: { customerId } })
  }

  async getOne (dto: GetOneCustomerAddressRepositoryDTO): Promise<CustomerAddress> {
    const { addressId, customerId } = dto
    return await this.repository.findOne({ where: { id: addressId, customerId } })
  }

  async deleteOne (dto: DeleteOneCustomerAddressRepositoryDTO): Promise<void> {
    const { addressId, customerId } = dto
    await this.repository.delete({ id: addressId, customerId })
  }
}
