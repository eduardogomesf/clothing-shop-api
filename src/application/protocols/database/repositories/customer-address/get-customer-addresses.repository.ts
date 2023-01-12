import { CustomerAddress } from '@/domain/entities'

export interface GetCustomerAddressesRepository {
  getAllByCustomerId: (customerId: string) => Promise<CustomerAddress[]>
}
