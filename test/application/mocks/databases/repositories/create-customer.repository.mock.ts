import { CreateCustomerRepository, CreateCustomerRepositoryDto } from "@/application/protocols/database/repositories/customer/create-customer.repository";
import { Customer } from "@/domain/entities/customer";

export class CreateCustomerRepositoryStub implements CreateCustomerRepository {
  create (createDto: CreateCustomerRepositoryDto): Promise<Customer> {
    const { name, email, cellphoneNumber, password } = createDto

    return Promise.resolve({
      name,
      cellphoneNumber,
      email,
      password,
      id: 'any-id',
    })
  };

}
