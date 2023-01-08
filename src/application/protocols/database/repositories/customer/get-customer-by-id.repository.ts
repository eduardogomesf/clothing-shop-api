import { Customer } from '@/domain/entities'

export interface GetCustomerByIdRepository {
  getById: (id: string) => Promise<Customer>
}
