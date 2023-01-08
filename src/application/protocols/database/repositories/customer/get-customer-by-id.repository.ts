import { Customer } from '@/domain/entities'

export interface GetCustomerByIdRepository {
  get: (id: string) => Promise<Customer>
}
