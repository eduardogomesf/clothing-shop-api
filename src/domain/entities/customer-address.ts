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
