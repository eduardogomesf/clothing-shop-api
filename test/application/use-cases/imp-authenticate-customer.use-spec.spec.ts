import { ImpAuthenticateCustomerUseCase } from "../../../src/application/use-cases/customer/imp-authenticate-customer.use-case"
import { GetCustomerByEmailRepository } from "@/application/protocols/database/repositories/customer"
import { Encrypter, HashComparer } from "@/application/protocols/utils/cryptography"
import { GetCustomerByEmailRepositoryStub } from "../mocks/databases/repositories/get-customer-by-email.repository.mock"
import { EncrypterStub, HashComparerStub } from "../mocks/utils/cryptography"
import { NotFoundException } from "../../../src/application/exceptions/not-found.exception"

describe('AuthenticateCustomerUseCase', () => {
  let authenticateCustomerUseCase: ImpAuthenticateCustomerUseCase
  let getCustomerByEmailRepository: GetCustomerByEmailRepository
  let hashComparer: HashComparer
  let encrypter: Encrypter

  beforeEach(() => {
    getCustomerByEmailRepository = new GetCustomerByEmailRepositoryStub()
    hashComparer = new HashComparerStub()
    encrypter = new EncrypterStub()
    authenticateCustomerUseCase = new ImpAuthenticateCustomerUseCase(
      getCustomerByEmailRepository,
      hashComparer,
      encrypter
    )
  })

  it('should be able to authenticate a customer', async () => {
    const result = await authenticateCustomerUseCase.auth({
      email: 'tester@test.com',
      password: 'any-password'
    })

    expect(result).toEqual({
      token: 'token'
    })
  })

  it('should not be able to authenticate a customer with a not used e-mail', async () => {
    getCustomerByEmailRepository.get = jest.fn().mockResolvedValue(Promise.resolve(null))

    const promise = authenticateCustomerUseCase.auth({
      email: 'invalid-customer@test.com',
      password: 'any-password'
    })

    await expect(promise).rejects.toThrowError(new NotFoundException('Customer'))
  })

  it('should not be able to authenticate a customer with valid e-mail but invalid password', async () => {
    hashComparer.compare = jest.fn().mockResolvedValue(Promise.resolve(false))

    const promise = authenticateCustomerUseCase.auth({
      email: 'invalid-customer@test.com',
      password: 'any-password'
    })

    await expect(promise).rejects.toThrowError(new NotFoundException('Customer'))
  })

  it('should call GetCustomerByEmailRepository.get with correct value', async () => {
    const getSpy = jest.spyOn(getCustomerByEmailRepository, 'get')

    await authenticateCustomerUseCase.auth({
      email: 'tester@test.com',
      password: 'any-password'
    })

    expect(getSpy).toHaveBeenCalledWith('tester@test.com')
  })

  it('should call HashComparer.compare with correct values', async () => {
    const compareSpy = jest.spyOn(hashComparer, 'compare')

    await authenticateCustomerUseCase.auth({
      email: 'tester@test.com',
      password: 'any-other-password'
    })

    expect(compareSpy).toHaveBeenCalledWith('any-password', 'any-other-password')
  })

  it('should call Encrypter.encrypt with correct values', async () => {
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')

    await authenticateCustomerUseCase.auth({
      email: 'tester@test.com',
      password: 'any-password'
    })

    expect(encryptSpy).toHaveBeenCalledWith({ id: 'any-id' })
  })

  it('should pass along any error thrown by GetCustomerByEmailRepository.get', async () => {
    getCustomerByEmailRepository.get = jest.fn().mockImplementation(() => { throw new Error('any_error') })

    const promise = authenticateCustomerUseCase.auth({
      email: 'invalid-customer@test.com',
      password: 'any-password'
    })

    await expect(promise).rejects.toThrowError(new Error('any_error'))
  })

  it('should pass along any error thrown by HashComparer.comparer', async () => {
    hashComparer.compare = jest.fn().mockImplementation(() => { throw new Error('any_error') })

    const promise = authenticateCustomerUseCase.auth({
      email: 'invalid-customer@test.com',
      password: 'any-password'
    })

    await expect(promise).rejects.toThrowError(new Error('any_error'))
  })

  it('should pass along any error thrown by Encrypter.encrypt', async () => {
    encrypter.encrypt = jest.fn().mockImplementation(() => { throw new Error('any_error') })

    const promise = authenticateCustomerUseCase.auth({
      email: 'invalid-customer@test.com',
      password: 'any-password'
    })

    await expect(promise).rejects.toThrowError(new Error('any_error'))
  })
})
