import { AddCustomerAddressUseCase, AddCustomerAddressUseCaseDTO, AddCustomerAddressUseCaseResponse } from '@/domain/use-cases/customer-address'
import { GetCustomerByIdRepository } from '../../protocols/database/repositories/customer'
import { CreateCustomerAddressRepository } from '../../protocols/database/repositories/customer-address'
import { MissingParamsException, NotFoundException } from '../../exceptions'
import { PayloadValidator } from '../../helpers'

export class ImpAddCustomerAddressUseCase implements AddCustomerAddressUseCase {
  constructor(
    private readonly getCustomerByIdRepository: GetCustomerByIdRepository,
    private readonly createCustomerAddressRepository: CreateCustomerAddressRepository
  ) {}

  async add (addressData: AddCustomerAddressUseCaseDTO, customerId: string): Promise<AddCustomerAddressUseCaseResponse> {
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

    const { id } = await this.createCustomerAddressRepository.create(addressToAdd)

    return { id }
  };
}
