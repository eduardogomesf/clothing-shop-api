import { CreateCustomerUseCase } from '@/domain/use-cases/customer/create-customer.use-case'
import { CreateCustomerRepository, GetCustomerByEmailRepository } from '@/application/protocols/database/repositories/customer'
import { Hasher } from '@/application/protocols/utils/cryptography/hasher.util'
import { ImpCreateCustomerUseCase } from '../../../src/application/use-cases/customer'
import { InformationAlreadyInUseException, MissingParamsException } from '../../../src/application/exceptions'
import { HasherStub } from '../mocks/utils/cryptography'
import { CreateCustomerRepositoryStub } from '../mocks/databases/repositories/create-customer.repository.mock'
import { GetCustomerByEmailRepositoryStub } from '../mocks/databases/repositories/get-customer-by-email.repository.mock'

describe('CreateCustomerUseCase', () => {
  let hasher: Hasher
  let createCustomerRepository: CreateCustomerRepository
  let getCustomerByEmailRepository: GetCustomerByEmailRepository
  let createCustomerUseCase: CreateCustomerUseCase

  beforeEach(() => {
    hasher = new HasherStub()
    createCustomerRepository = new CreateCustomerRepositoryStub()
    getCustomerByEmailRepository = new GetCustomerByEmailRepositoryStub()
    createCustomerUseCase = new ImpCreateCustomerUseCase(
      createCustomerRepository,
      hasher,
      getCustomerByEmailRepository
    )
  })

  it('should not be able to create a new customer without name', async () => {
    const promise = createCustomerUseCase.create({
      cellphoneNumber: '11995433245',
      email: 'tester@tester.com.br',
      password: 'any-password'
    } as any)

    await expect(promise).rejects.toThrowError(new MissingParamsException(['name']))
  })

  it('should not be able to create a new customer without email', async () => {
    const promise = createCustomerUseCase.create({
      cellphoneNumber: '11995433245',
      name: 'tester master',
      password: 'any-password'
    } as any)

    await expect(promise).rejects.toThrowError(new MissingParamsException(['email']))
  })

  it('should not be able to create a new customer without cellphoneNumber', async () => {
    const promise = createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      password: 'any-password'
    } as any)

    await expect(promise).rejects.toThrowError(new MissingParamsException(['cellphoneNumber']))
  })

  it('should not be able to create a new customer without password', async () => {
    const promise = createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245'
    } as any)

    await expect(promise).rejects.toThrowError(new MissingParamsException(['password']))
  })

  it('should be able to create a new customer', async () => {
    getCustomerByEmailRepository.get = jest.fn().mockResolvedValue(null)

    const result = await createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'any-password'
    } as any)

    expect(result).toBeUndefined()
  })

  it('should not be able to create a customer with an e-mail that is already in use', async () => {
    const promise = createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'any-password'
    } as any)

    await expect(promise).rejects.toThrowError(new InformationAlreadyInUseException('e-mail'))
  })

  it('should call GetCustomerByEmailRepository.get with correct value', async () => {
    getCustomerByEmailRepository.get = jest.fn().mockResolvedValue(null)

    const getSpy = jest.spyOn(getCustomerByEmailRepository, 'get')

    await createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'any-password'
    } as any)

    expect(getSpy).toHaveBeenCalledWith('tester@tester.com.br')
  })

  it('should call Hasher.hash with correct value', async () => {
    getCustomerByEmailRepository.get = jest.fn().mockResolvedValue(null)

    const hashSpy = jest.spyOn(hasher, 'hash')

    await createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'any-password'
    } as any)

    expect(hashSpy).toHaveBeenCalledWith('any-password')
  })

  it('should call CreateCustomerRepository.create with correct values', async () => {
    getCustomerByEmailRepository.get = jest.fn().mockResolvedValue(null)

    const createSpy = jest.spyOn(createCustomerRepository, 'create')

    await createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'any-password'
    } as any)

    expect(createSpy).toHaveBeenCalledWith({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'hashed-value'
    })
  })

  it('should pass along any error thrown by Hasher.hash', async () => {
    getCustomerByEmailRepository.get = jest.fn().mockResolvedValue(null)

    hasher.hash = jest.fn().mockImplementation(() => {
      throw new Error('a-random-error')
    })

    const promise = createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'any-password'
    } as any)

    await expect(promise).rejects.toThrowError(new Error('a-random-error'))
  })

  it('should pass along any error thrown by CreateCustomerRepository.create', async () => {
    getCustomerByEmailRepository.get = jest.fn().mockResolvedValue(null)

    createCustomerRepository.create = jest.fn().mockImplementation(() => {
      throw new Error('a-random-error')
    })

    const promise = createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'any-password'
    } as any)

    await expect(promise).rejects.toThrowError(new Error('a-random-error'))
  })

  it('should pass along any error thrown by GetCustomerByEmailRepository.get', async () => {
    getCustomerByEmailRepository.get = jest.fn().mockImplementation(() => {
      throw new Error('a-random-error')
    })

    const promise = createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'any-password'
    } as any)

    await expect(promise).rejects.toThrowError(new Error('a-random-error'))
  })
})
