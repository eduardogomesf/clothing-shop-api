export type AddCustomerAddressUseCaseDTO = {
  street: string
  number: number
  neighborhood: string
  city: string
  state: string
  country: string
  postalCode: string
  complement?: string
}

export type AddCustomerAddressUseCaseResponse = {
  id: string
}

export interface AddCustomerAddressUseCase {
  add: (address: AddCustomerAddressUseCaseDTO, customerId: string) => Promise<AddCustomerAddressUseCaseResponse>
}
