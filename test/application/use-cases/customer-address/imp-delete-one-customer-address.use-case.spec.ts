import { NotFoundException } from '../../../../src/application/exceptions'
import { DeleteOneCustomerAddressRepository, GetOneCustomerAddressRepository } from '../../../../src/application/protocols/database/repositories/customer-address'
import { ImpDeleteCustomerAddressUseCase } from '../../../../src/application/use-cases/customer-address'
import { DeleteCustomerAddressUseCase } from '../../../../src/domain/use-cases/customer-address/'
import { DeleteOneCustomerAddressRepositoryStub, GetOneCustomerAddressRepositoryStub } from '../../mocks/databases/customer-address.repository.mock'

describe('DeleteCustomerAddressUseCase', () => {
  let sut: DeleteCustomerAddressUseCase
  let getOneCustomerAddressRepository: GetOneCustomerAddressRepository
  let deleteOneCustomerAddressRepository: DeleteOneCustomerAddressRepository

  beforeEach(() => {
    getOneCustomerAddressRepository = new GetOneCustomerAddressRepositoryStub()
    deleteOneCustomerAddressRepository = new DeleteOneCustomerAddressRepositoryStub()
    sut = new ImpDeleteCustomerAddressUseCase(getOneCustomerAddressRepository, deleteOneCustomerAddressRepository)
  })

  it('should be able to delete one customer address', async () => {
    const deleteOneSpy = jest.spyOn(deleteOneCustomerAddressRepository, 'deleteOne')
    const getOneSpy = jest.spyOn(getOneCustomerAddressRepository, 'getOne')

    const result = await sut.deleteOne({ addressId: 'address-id', customerId: 'customer-id' })

    expect(getOneSpy).toHaveBeenCalledWith({ addressId: 'address-id', customerId: 'customer-id' })
    expect(deleteOneSpy).toHaveBeenCalledWith({ addressId: 'address-id', customerId: 'customer-id' })
    expect(result).toBeUndefined()
  })

  it('should not be able to delete an address that does not exist', async () => {
    getOneCustomerAddressRepository.getOne = jest.fn().mockResolvedValue(Promise.resolve(null))

    const promise = sut.deleteOne({ addressId: 'address-id', customerId: 'customer-id' })

    expect(promise).rejects.toThrowError(new NotFoundException('Address'))
  })

  it('should pass along any error thrown by GetOneCustomerAddressRepository.getOne', async () => {
    getOneCustomerAddressRepository.getOne = jest.fn().mockImplementation(() => { throw new Error('any_error') })

    const promise = sut.deleteOne({ addressId: 'address-id', customerId: 'customer-id' })

    expect(promise).rejects.toThrowError(new Error('any_error'))
  })

  it('should pass along any error thrown by DeleteOneCustomerAddressRepository.deleteOne', async () => {
    deleteOneCustomerAddressRepository.deleteOne = jest.fn().mockImplementation(() => { throw new Error('any_other_error') })

    const promise = sut.deleteOne({ addressId: 'address-id', customerId: 'customer-id' })

    expect(promise).rejects.toThrowError(new Error('any_other_error'))
  })
})
