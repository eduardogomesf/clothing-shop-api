import { CustomerAddress } from '../../entities'

export interface GetCustomerAddressesUseCase {
  getAll: (customerId: string) => Promise<CustomerAddress[]>
}
