import { CustomerAddress } from '@/domain/entities'
import { GetCustomerAddressesUseCase } from '@/domain/use-cases/customer-address'
import { GetCustomerAddressesRepository } from '../../protocols/database/repositories/customer-address'

export class ImpGetCustomerAddressesUseCase implements GetCustomerAddressesUseCase {
  constructor(
    private readonly getCustomerAddressesRepository: GetCustomerAddressesRepository
  ) {}

  async getAll (customerId: string): Promise<CustomerAddress[]> {
    return await this.getCustomerAddressesRepository.getAllByCustomerId(customerId)
  }
}
