export type AuthenticateCustomerDto = {
  email: string
  password: string
}

export type AuthenticateCustomerResponse = {
  token: string
}

export interface AuthenticateCustomer {
  auth: (dto: AuthenticateCustomerDto) => Promise<AuthenticateCustomerResponse>
}
