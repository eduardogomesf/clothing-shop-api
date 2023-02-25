import { GetActivePaymentMethodsRepository } from '../../../../src/application/protocols/database/repositories/payment-method'
import { ImpGetActivePaymentMethodsUseCase } from '../../../../src/application/use-cases/payment-method/'
import { PaymentMethodRepositoryStub } from '../../mocks/databases/payment-method.repository.mock'

describe('GetActivePaymentMethodsUseCase', () => {
  let sut: ImpGetActivePaymentMethodsUseCase
  let getActivePaymentMethodsRepository: GetActivePaymentMethodsRepository

  beforeEach(() => {
    getActivePaymentMethodsRepository = new PaymentMethodRepositoryStub()
    sut = new ImpGetActivePaymentMethodsUseCase(getActivePaymentMethodsRepository)
  })

  it('should get a list of active payment methods', async () => {
    const result = await sut.getActives()

    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('id')
    expect(result[0]).toHaveProperty('name')
    expect(result[0]).toHaveProperty('isActive')
  })

  it('should return an empty list of payment methods', async () => {
    getActivePaymentMethodsRepository.getAllActive = jest.fn().mockResolvedValue(Promise.resolve([]))

    const result = await sut.getActives()

    expect(result).toEqual([])
  })

  it('should pass along any error thrown by GetActivePaymentMethodsRepository.getAllActives', async () => {
    getActivePaymentMethodsRepository.getAllActive = jest.fn().mockImplementation(() => { throw new Error('any-error') })

    const promise = sut.getActives()

    await expect(promise).rejects.toThrowError(new Error('any-error'))
  })
})
