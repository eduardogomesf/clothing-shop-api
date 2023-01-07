export interface CustomerAddress {
  id: string
  street: string
  number: number
  neighborhood: string
  city: string
  state: string
  country: string
  postalCode: string
  complement?: string
  isMain: boolean
  customerId: string
}

export interface Customer {
  id: string;
  name: string;
  cellphoneNumber: string;
  email: string;
  password: string;
  addresses?: CustomerAddress[]
}
