import { DeleteCustomerAddressUseCase, DeleteCustomerAddressUseCaseDTO } from '@/domain/use-cases/customer-address'
import { NotFoundException } from '../../exceptions'
import { DeleteOneCustomerAddressRepository, GetOneCustomerAddressRepository } from '../../protocols/database/repositories/customer-address'

export class ImpDeleteCustomerAddressUseCase implements DeleteCustomerAddressUseCase {
  constructor(
    private readonly getOneCustomerAddressRepository: GetOneCustomerAddressRepository,
    private readonly deleteOneCustomerAddressRepository: DeleteOneCustomerAddressRepository
  ) {}

  async deleteOne (dto: DeleteCustomerAddressUseCaseDTO): Promise<void> {
    const { addressId, customerId } = dto

    const address = await this.getOneCustomerAddressRepository.getOne({ addressId, customerId })

    if (!address) {
      throw new NotFoundException('Address')
    }

    await this.deleteOneCustomerAddressRepository.deleteOne({ addressId, customerId })
  }
}
