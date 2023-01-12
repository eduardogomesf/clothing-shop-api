import { CreateCustomerRepository, CreateCustomerRepositoryDto, GetCustomerByEmailRepository, GetCustomerByIdRepository } from '../../../../src/application/protocols/database/repositories/customer'
import { Customer } from '../../../../src/domain/entities'

export class CreateCustomerRepositoryStub implements CreateCustomerRepository {
  create (createDto: CreateCustomerRepositoryDto): Promise<Customer> {
    const { name, email, cellphoneNumber, password } = createDto

    return Promise.resolve({
      name,
      cellphoneNumber,
      email,
      password,
      id: 'any-id'
    })
  };
}

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
