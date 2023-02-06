import { Injectable } from '@nestjs/common'
import { Customer } from '@prisma/client'
import {
  CreateCustomerRepository,
  CreateCustomerRepositoryDto,
  GetCustomerByEmailRepository,
  GetCustomerByIdRepository
} from '@/application/protocols/database/repositories/customer'
import { prisma } from '../configs/prisma'

@Injectable()
export class PgCustomerRepository implements CreateCustomerRepository, GetCustomerByEmailRepository, GetCustomerByIdRepository {
  async create (createDto: CreateCustomerRepositoryDto): Promise<Customer> {
    return await prisma.customer.create({
      data: createDto
    })
  }

  async get (email: string): Promise<Customer> {
    return await prisma.customer.findUnique({ where: { email } })
  }

  async getById (id: string): Promise<Customer> {
    return await prisma.customer.findUnique({ where: { id } })
  }
}
