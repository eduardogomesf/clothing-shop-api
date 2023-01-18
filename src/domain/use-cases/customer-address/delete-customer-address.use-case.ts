export type DeleteCustomerAddressUseCaseDTO = {
  customerId: string
  addressId: string
}

export interface DeleteCustomerAddressUseCase {
  deleteOne: (dto: DeleteCustomerAddressUseCaseDTO) => Promise<void>
}
