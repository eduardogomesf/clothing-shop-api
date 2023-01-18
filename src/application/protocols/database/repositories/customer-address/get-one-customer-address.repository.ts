import { CustomerAddress } from '@/domain/entities'

export type GetOneCustomerAddressRepositoryDTO = {
  customerId: string
  addressId: string
}

export interface GetOneCustomerAddressRepository {
  getOne: (dto: GetOneCustomerAddressRepositoryDTO) => Promise<CustomerAddress>
}
