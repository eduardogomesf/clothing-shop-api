import {
  CreateCustomerAddressRepository,
  CreateCustomerAddressRepositoryDTO,
  DeleteOneCustomerAddressRepository,
  DeleteOneCustomerAddressRepositoryDTO,
  GetCustomerAddressesRepository,
  GetOneCustomerAddressRepository,
  GetOneCustomerAddressRepositoryDTO
} from '@/application/protocols/database/repositories/customer-address'
import { CustomerAddress } from '../../../../src/domain/entities'

export class GetCustomerAddressesRepositoryStub implements GetCustomerAddressesRepository {
  getAllByCustomerId (customerId: string): Promise<CustomerAddress[]> {
    return Promise.resolve([
      {
        id: 'address-id',
        street: 'any-street',
        number: 100,
        neighborhood: 'any-neighbor',
        city: 'any-city',
        state: 'any-state',
        country: 'Brazil',
        postalCode: '53230634',
        complement: 'any-complement',
        isMain: true,
        customerId: 'any-customer-id'
      }
    ])
  }
}

export class CreateCustomerAddressRepositoryStub implements CreateCustomerAddressRepository {
  create (createAddress: CreateCustomerAddressRepositoryDTO): Promise<CustomerAddress> {
    return Promise.resolve({
      ...createAddress,
      id: 'any-id'
    })
  };
}

export class DeleteOneCustomerAddressRepositoryStub implements DeleteOneCustomerAddressRepository {
  deleteOne (dto: DeleteOneCustomerAddressRepositoryDTO): Promise<void> {
    return Promise.resolve(null)
  }
}

export class GetOneCustomerAddressRepositoryStub implements GetOneCustomerAddressRepository {
  getOne (dto: GetOneCustomerAddressRepositoryDTO): Promise<CustomerAddress> {
    return Promise.resolve({
      id: 'address-id',
      street: 'any-street',
      number: 100,
      neighborhood: 'any-neighbor',
      city: 'any-city',
      state: 'any-state',
      country: 'Brazil',
      postalCode: '53230634',
      complement: 'any-complement',
      isMain: true,
      customerId: 'any-customer-id'
    })
  }
}
