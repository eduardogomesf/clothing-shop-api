import { Customer } from '@/domain/entities'

export interface CreateCustomerRepositoryDto {
  name: string;
  cellphoneNumber: string;
  email: string;
  password: string;
}

export interface CreateCustomerRepository {
  create: (createDto: CreateCustomerRepositoryDto) => Promise<Customer>
}
