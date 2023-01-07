import { CustomerAddress } from "../../entities/customer";

type AddCustomerAddressUseCaseDTO = {
  street: string
  number: number
  neighborhood: string
  city: string
  state: string
  country: string
  postalCode: string
  complement?: string
}

export interface AddCustomerAddressUseCase {
  add: (address: AddCustomerAddressUseCaseDTO) => Promise<CustomerAddress>
}
