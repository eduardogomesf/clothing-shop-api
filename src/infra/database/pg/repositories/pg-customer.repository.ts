import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from "typeorm";
import { Customer } from "@/domain/entities/customer";
import { CreateCustomerRepository, CreateCustomerRepositoryDto } from "@/application/protocols/database/repositories/customer/create-customer.repository";
import { CustomerModel } from "../models/customer.model";

@Injectable()
export class PgCustomerRepository implements CreateCustomerRepository {

  constructor(
    @InjectRepository(CustomerModel)
    private readonly repository: Repository<CustomerModel>
  ) {}

  async create (createDto: CreateCustomerRepositoryDto): Promise<Customer> {
    const customer = this.repository.create(createDto)
    await this.repository.save(customer)
    return customer
  };

}
