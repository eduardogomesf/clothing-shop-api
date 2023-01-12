import { GetCustomerAddressesRepository } from '../../../../src/application/protocols/database/repositories/customer-address'
import { ImpGetCustomerAddressesUseCase } from '../../../../src/application/use-cases/customer-address/imp-get-customer-addresses.use-case'
import { GetCustomerAddressesUseCase } from '../../../../src/domain/use-cases/customer-address'
import { GetCustomerAddressesRepositoryStub } from '../../mocks/databases/customer-address.repository.mock'

describe('GetCustomerAddressesUseCase', () => {
  let getCustomerAddressesUseCase: GetCustomerAddressesUseCase
  let getCustomerAddressesRepository: GetCustomerAddressesRepository

  beforeEach(() => {
    getCustomerAddressesRepository = new GetCustomerAddressesRepositoryStub()
    getCustomerAddressesUseCase = new ImpGetCustomerAddressesUseCase(getCustomerAddressesRepository)
  })

  it('should get a list of customer addresses', async () => {
    const result = await getCustomerAddressesUseCase.getAll('any-customer-id')
    expect(result).toHaveLength(1)
  })

  it('should call GetCustomerAddressesRepository.getAllByCustomerId with correct value', async () => {
    const getAllByCustomerIdSpy = jest.spyOn(getCustomerAddressesRepository, 'getAllByCustomerId')
    await getCustomerAddressesUseCase.getAll('any-customer-id')
    expect(getAllByCustomerIdSpy).toHaveBeenCalledWith('any-customer-id')
  })

  it('should get an empty list of addresses', async () => {
    getCustomerAddressesRepository.getAllByCustomerId = jest.fn().mockResolvedValue([])
    const result = await getCustomerAddressesUseCase.getAll('any-customer-id')
    expect(result).toHaveLength(0)
  })

  it('should pass along any error thrown by GetCustomerAddressesRepository.getAllByCustomerId', async () => {
    getCustomerAddressesRepository.getAllByCustomerId = jest.fn().mockImplementation(() => { throw new Error('any-error') })
    const promise = getCustomerAddressesUseCase.getAll('any-customer-id')
    await expect(promise).rejects.toThrowError(new Error('any-error'))
  })
})
