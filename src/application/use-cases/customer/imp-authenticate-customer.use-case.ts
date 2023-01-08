import { AuthenticateCustomer, AuthenticateCustomerDto, AuthenticateCustomerResponse } from '@/domain/use-cases/customer'
import { NotFoundException } from '../../exceptions/not-found.exception'
import { GetCustomerByEmailRepository } from '../../protocols/database/repositories/customer'
import { HashComparer, Encrypter } from '../../protocols/utils/cryptography'

export class ImpAuthenticateCustomerUseCase implements AuthenticateCustomer {
  constructor(
    private readonly getCustomerByEmailRepository: GetCustomerByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (dto: AuthenticateCustomerDto): Promise<AuthenticateCustomerResponse> {
    const { email, password } = dto

    const customerByEmail = await this.getCustomerByEmailRepository.get(email)

    if (!customerByEmail) {
      throw new NotFoundException('Customer')
    }

    const isValidPassword = await this.hashComparer.compare(customerByEmail.password, password)

    if (!isValidPassword) {
      throw new NotFoundException('Customer')
    }

    const token = await this.encrypter.encrypt({ id: customerByEmail.id })

    return {
      token
    }
  }
}
