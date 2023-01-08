import { Customer } from '@/domain/entities/customer'

export interface GetCustomerByIdRepository {
  get: (id: string) => Promise<Customer>
}
