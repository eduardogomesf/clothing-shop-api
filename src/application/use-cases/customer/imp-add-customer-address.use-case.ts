import { AddCustomerAddressUseCase, AddCustomerAddressUseCaseDTO } from '@/domain/use-cases/customer'
import { CustomerAddress } from '@/domain/entities/customer'
import { CreateCustomerAddressRepository, GetCustomerByIdRepository } from '../../protocols/database/repositories/customer'
import { MissingParamsException, NotFoundException } from '../../exceptions'
import { PayloadValidator } from '../../helpers'

export class ImpAddCustomerAddressUseCase implements AddCustomerAddressUseCase {
  constructor(
    private readonly getCustomerByIdRepository: GetCustomerByIdRepository,
    private readonly createCustomerAddressRepository: CreateCustomerAddressRepository
  ) {}

  async add (addressData: AddCustomerAddressUseCaseDTO, customerId: string): Promise<CustomerAddress> {
    const missingParamsValidation = PayloadValidator.isAnyParamMissing(
      ['street', 'number', 'neighborhood', 'city', 'state', 'country', 'postalCode'],
      addressData
    )

    if (missingParamsValidation.error && missingParamsValidation.missingParams.length > 0) {
      throw new MissingParamsException(missingParamsValidation.missingParams)
    }

    const customer = await this.getCustomerByIdRepository.getById(customerId)

    if (!customer) {
      throw new NotFoundException('Customer')
    }

    const addressToAdd = {
      ...addressData,
      customerId,
      isMain: false
    }

    return await this.createCustomerAddressRepository.create(addressToAdd)
  };
}
