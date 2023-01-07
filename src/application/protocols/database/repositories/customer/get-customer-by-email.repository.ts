import { Customer } from "@/domain/entities/customer";

export interface GetCustomerByEmailRepository {
  get: (email: string) => Promise<Customer>
}
