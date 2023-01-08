import { Customer } from '@/domain/entities'

export interface GetCustomerByEmailRepository {
  get: (email: string) => Promise<Customer>
}
