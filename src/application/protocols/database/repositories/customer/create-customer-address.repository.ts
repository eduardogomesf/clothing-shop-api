import { CustomerAddress } from '@/domain/entities'

export interface CreateCustomerAddressRepositoryDTO {
  street: string
  number: number
  neighborhood: string
  city: string
  state: string
  country: string
  postalCode: string
  complement?: string
  customerId: string
  isMain: boolean
}

export interface CreateCustomerAddressRepository {
  create: (createAddress: CreateCustomerAddressRepositoryDTO) => Promise<CustomerAddress>
}
