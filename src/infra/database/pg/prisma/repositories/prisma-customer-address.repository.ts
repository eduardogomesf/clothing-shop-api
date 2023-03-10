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
import { CustomerAddress } from '@/domain/entities'
import { prisma } from '../configs/prisma'
import { PrismaCustomerAddressMapper } from '../mappers/prisma-customer-address.mapper'

@Injectable()
export class PrismaCustomerAddressRepository implements
  CreateCustomerAddressRepository, GetCustomerAddressesRepository,
  GetOneCustomerAddressRepository, DeleteOneCustomerAddressRepository {
  constructor(
    private readonly prismaCustomerAddressMapper: PrismaCustomerAddressMapper
  ) {}

  async create (createAddress: CreateCustomerAddressRepositoryDTO): Promise<CustomerAddress> {
    return await prisma.customerAddress.create({
      data: createAddress
    })
  };

  async getAllByCustomerId (customerId: string): Promise<CustomerAddress[]> {
    const result = await prisma.customerAddress.findMany({
      where: {
        customerId
      }
    })
    return this.prismaCustomerAddressMapper.mapAddresses(result)
  }

  async getOne (dto: GetOneCustomerAddressRepositoryDTO): Promise<CustomerAddress> {
    const { addressId, customerId } = dto
    return await prisma.customerAddress.findFirst({
      where: { id: addressId, customerId }
    })
  }

  async deleteOne (dto: DeleteOneCustomerAddressRepositoryDTO): Promise<void> {
    const { addressId } = dto
    await prisma.customerAddress.delete({
      where: { id: addressId }
    })
  }
}
