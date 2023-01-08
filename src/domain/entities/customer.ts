import { CustomerAddress } from './customer-model'

export interface Customer {
  id: string;
  name: string;
  cellphoneNumber: string;
  email: string;
  password: string;
  addresses?: CustomerAddress[]
}
