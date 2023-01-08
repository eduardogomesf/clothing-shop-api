import {
  CreateCustomerUseCase,
  CreateCustomerUseCaseDTO
} from '@/domain/use-cases/customer'
import { CreateCustomerRepository } from '@/application/protocols/database/repositories/customer/create-customer.repository'
import { Hasher } from '@/application/protocols/utils/cryptography/hasher.util'
import { PayloadValidator } from '../../helpers/payload-validator.helper'
import { InformationAlreadyInUseException, MissingParamsException } from '../../exceptions'
import { GetCustomerByEmailRepository } from '../../protocols/database/repositories/customer/get-customer-by-email.repository'

export class ImpCreateCustomerUseCase implements CreateCustomerUseCase {
  constructor(
    private readonly createCustomerRepository: CreateCustomerRepository,
    private readonly hasher: Hasher,
    private readonly getCustomerByEmailRepository: GetCustomerByEmailRepository
  ) {}

  async create (dto: CreateCustomerUseCaseDTO): Promise<void> {
    const { name, email, cellphoneNumber, password } = dto

    const missingParamsValidation = PayloadValidator.isAnyParamMissing(
      ['name', 'email', 'cellphoneNumber', 'password'],
      { name, email, cellphoneNumber, password }
    )

    if (missingParamsValidation.error && missingParamsValidation.missingParams.length > 0) {
      throw new MissingParamsException(missingParamsValidation.missingParams)
    }

    const customerById = await this.getCustomerByEmailRepository.get(email)

    const customerAlreadyExists = !!customerById

    if (customerAlreadyExists) {
      throw new InformationAlreadyInUseException('e-mail')
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
