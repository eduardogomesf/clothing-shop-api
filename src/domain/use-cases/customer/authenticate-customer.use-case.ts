export type AuthenticateCustomerDto = {
  email: string
  password: string
}

export type AuthenticateCustomerResponse = {
  token: string
  customerId: string
}

export interface AuthenticateCustomer {
  auth: (dto: AuthenticateCustomerDto) => Promise<AuthenticateCustomerResponse>
}
