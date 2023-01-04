import {
  CreateCustomerUseCase,
  CreateCustomerUseCaseDTO
} from '@/domain/use-cases/customer/create-customer.use-case'
import { CreateCustomerRepository } from '@/application/protocols/database/repositories/customer/create-customer.repository'
import { Hasher } from '@/application/protocols/utils/cryptography/hasher.util'
import { PayloadValidator } from '../../helpers/payload-validator.helper'

export class ImpCreateCustomerUseCase implements CreateCustomerUseCase {
  constructor(
    private readonly createCustomerRepository: CreateCustomerRepository,
    private readonly hasher: Hasher
  ) {}

  async create (dto: CreateCustomerUseCaseDTO): Promise<void> {
    const { name, email, cellphoneNumber, password } = dto

    const paramsMissingValidation = PayloadValidator.isAnyParamMissing(
      ['name', 'email', 'cellphoneNumber', 'password'],
      { name, email, cellphoneNumber, password }
    )

    if (paramsMissingValidation.error && paramsMissingValidation.missingParams.length > 0) {
      throw new Error('Invalid customer data')
    }

    const hashedPassword = await this.hasher.hash(password)

    await this.createCustomerRepository.create({
      email,
      cellphoneNumber,
      name,
      password: hashedPassword
    })
  }
}
