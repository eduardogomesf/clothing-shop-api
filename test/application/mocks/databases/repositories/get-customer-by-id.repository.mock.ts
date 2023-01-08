import { GetCustomerByIdRepository } from '@/application/protocols/database/repositories/customer'
import { Customer } from '../../../../../src/domain/entities/customer'

export class GetCustomerByIdRepositoryStub implements GetCustomerByIdRepository {
  getById (id: string): Promise<Customer> {
    return Promise.resolve({
      id,
      email: 'any@mail.com',
      cellphoneNumber: '11994364325',
      name: 'Mr. Tester',
      password: 'any-password'
    })
  };
}
