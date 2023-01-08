import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Customer } from '@/domain/entities/customer'
import { CreateCustomerRepository, CreateCustomerRepositoryDto, GetCustomerByEmailRepository } from '@/application/protocols/database/repositories/customer'
import { CustomerModel } from '../models/customer.model'

@Injectable()
export class PgCustomerRepository implements CreateCustomerRepository, GetCustomerByEmailRepository {
  constructor(
    @InjectRepository(CustomerModel)
    private readonly repository: Repository<CustomerModel>
  ) {}

  async create (createDto: CreateCustomerRepositoryDto): Promise<Customer> {
    const customer = this.repository.create(createDto)
    await this.repository.save(customer)
    return customer
  }

  async get (email: string): Promise<Customer> {
    return await this.repository.findOneBy({ email })
  }
}
