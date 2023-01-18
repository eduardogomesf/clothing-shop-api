export type DeleteOneCustomerAddressRepositoryDTO = {
  customerId: string
  addressId: string
}

export interface DeleteOneCustomerAddressRepository {
  deleteOne: (dto: DeleteOneCustomerAddressRepositoryDTO) => Promise<void>
}
