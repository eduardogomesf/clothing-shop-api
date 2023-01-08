import { GetCustomerByEmailRepository } from '@/application/protocols/database/repositories/customer'
import { Customer } from '../../../../../src/domain/entities/customer'

export class GetCustomerByEmailRepositoryStub implements GetCustomerByEmailRepository {
  get (email: string): Promise<Customer> {
    return Promise.resolve({
      id: 'any-id',
      email,
      cellphoneNumber: '11994364325',
      name: 'Mr. Tester',
      password: 'any-password'
    })
  };
}
