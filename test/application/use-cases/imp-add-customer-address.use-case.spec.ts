import { MissingParamsException, NotFoundException } from '../../../src/application/exceptions'
import { CreateCustomerAddressRepository } from '../../../src/application/protocols/database/repositories/customer-address'
import { GetCustomerByIdRepository } from '../../../src/application/protocols/database/repositories/customer'
import { ImpAddCustomerAddressUseCase } from '../../../src/application/use-cases/customer-address'
import { AddCustomerAddressUseCase, AddCustomerAddressUseCaseDTO } from '../../../src/domain/use-cases/customer-address'
import { CreateCustomerAddressRepositoryStub } from '../mocks/databases/repositories/create-customer-address.repository.mock'
import { GetCustomerByIdRepositoryStub } from '../mocks/databases/repositories/get-customer-by-id.repository.mock'

describe('AddCustomerAddressUseCase', () => {
  let getCustomerByIdRepository: GetCustomerByIdRepository
  let createCustomerAddressRepository: CreateCustomerAddressRepository
  let addCustomerAddressUseCase: AddCustomerAddressUseCase

  let createAddressData: AddCustomerAddressUseCaseDTO = null

  beforeEach(() => {
    getCustomerByIdRepository = new GetCustomerByIdRepositoryStub()
    createCustomerAddressRepository = new CreateCustomerAddressRepositoryStub()
    addCustomerAddressUseCase = new ImpAddCustomerAddressUseCase(
      getCustomerByIdRepository,
      createCustomerAddressRepository
    )

    createAddressData = {
      city: 'Santana de Parnaíba',
      state: 'São Paulo',
      neighborhood: 'Boa Vista',
      complement: 'Subsolo 8',
      postalCode: '92093595',
      number: 7665,
      country: 'Brazil',
      street: 'São Francisco'
    }
  })

  it('should be able create a new customer address', async () => {
    const result = await addCustomerAddressUseCase.add(createAddressData, 'any-id')

    expect(result).toEqual({
      ...createAddressData,
      isMain: false,
      id: 'any-id',
      customerId: 'any-id'
    })
  })

  it('should not be able to create a new customer address without required params', async () => {
    const promise = addCustomerAddressUseCase.add({} as any, 'any-id')

    await expect(promise).rejects.toThrowError(new MissingParamsException(['street', 'number', 'neighborhood', 'city', 'state', 'country', 'postalCode']))
  })

  it('should not be able to create a new customer address of a non-existing customer', async () => {
    getCustomerByIdRepository.getById = jest.fn().mockResolvedValue(Promise.resolve(null))

    const promise = addCustomerAddressUseCase.add(createAddressData as any, 'any-id')

    await expect(promise).rejects.toThrowError(new NotFoundException('Customer'))
  })

  it('should call GetCustomerByIdRepository.get with correct value', async () => {
    const getSpy = jest.spyOn(getCustomerByIdRepository, 'getById')

    await addCustomerAddressUseCase.add(createAddressData, 'any-id')

    expect(getSpy).toHaveBeenCalledWith('any-id')
  })

  it('should call CreateCustomerAddressRepository.create with correct value', async () => {
    const createSpy = jest.spyOn(createCustomerAddressRepository, 'create')

    await addCustomerAddressUseCase.add(createAddressData, 'any-id')

    expect(createSpy).toHaveBeenCalledWith({
      ...createAddressData,
      isMain: false,
      customerId: 'any-id'
    })
  })

  it('should pass along any error thrown by GetCustomerByIdRepository.get', async () => {
    getCustomerByIdRepository.getById = jest.fn().mockImplementation(() => {
      throw new Error('any_error')
    })

    const promise = addCustomerAddressUseCase.add(createAddressData, 'any-id')

    await expect(promise).rejects.toThrowError(new Error('any_error'))
  })

  it('should pass along any error thrown by CreateCustomerAddressRepository.create', async () => {
    createCustomerAddressRepository.create = jest.fn().mockImplementation(() => {
      throw new Error('any_error')
    })

    const promise = addCustomerAddressUseCase.add(createAddressData, 'any-id')

    await expect(promise).rejects.toThrowError(new Error('any_error'))
  })
})
