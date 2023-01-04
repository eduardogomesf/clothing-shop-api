import { CreateCustomerUseCase } from "@/domain/use-cases/customer/create-customer.use-case"
import { CreateCustomerRepository } from "@/application/protocols/database/repositories/customer/create-customer.repository"
import { Hasher } from "@/application/protocols/utils/cryptography/hasher.util"
import { ImpCreateCustomerUseCase } from "../../../src/application/use-cases/customer/imp-create-customer.use-case"
import { HasherStub } from "../mocks/utils/cryptography/hasher.util.mock"
import { CreateCustomerRepositoryStub } from "../mocks/databases/repositories/create-customer.repository.mock"
import { MissingParamsException } from "../../../src/application/exceptions/missing-params.exception"

describe('CreateCustomerUseCase', () => {
  let hasher: Hasher
  let createCustomerRepository: CreateCustomerRepository
  let createCustomerUseCase: CreateCustomerUseCase

  beforeEach(() => {
    hasher = new HasherStub()
    createCustomerRepository = new CreateCustomerRepositoryStub()
    createCustomerUseCase = new ImpCreateCustomerUseCase(
      createCustomerRepository,
      hasher
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
      cellphoneNumber: '11995433245',
    } as any)

    await expect(promise).rejects.toThrowError(new MissingParamsException(['password']))
  })

  it('should be able to create a new customer', async () => {
    const result = await createCustomerUseCase.create({
      email: 'tester@tester.com.br',
      name: 'tester master',
      cellphoneNumber: '11995433245',
      password: 'any-password'
    } as any)

    expect(result).toBeUndefined()
  })

  it('should call Hasher.hash with correct value', async () => {
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
})
