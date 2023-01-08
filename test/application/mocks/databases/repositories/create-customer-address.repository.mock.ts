import { CreateCustomerAddressRepository, CreateCustomerAddressRepositoryDTO } from '@/application/protocols/database/repositories/customer-address'
import { CustomerAddress } from '../../../../../src/domain/entities/'

export class CreateCustomerAddressRepositoryStub implements CreateCustomerAddressRepository {
  create (createAddress: CreateCustomerAddressRepositoryDTO): Promise<CustomerAddress> {
    return Promise.resolve({
      ...createAddress,
      id: 'any-id'
    })
  };
}
