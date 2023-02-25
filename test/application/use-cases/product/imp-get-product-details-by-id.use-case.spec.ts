import { NotFoundException } from '../../../../src/application/exceptions'
import { GetProductByIdWithVariationsRepository } from '../../../../src/application/protocols/database/repositories/product/get-product-by-id-with-variations.repository'
import { ImpGetProductDetailsByIdUseCase } from '../../../../src/application/use-cases/product/imp-get-product-details-by-id.use-case'
import { ProductRepositoryStub } from '../../mocks/databases/product.repository.mock'

describe('GetProductDetailsById', () => {
  let sut: ImpGetProductDetailsByIdUseCase
  let getProductByIdWithVariationsRepository: GetProductByIdWithVariationsRepository

  beforeEach(() => {
    getProductByIdWithVariationsRepository = new ProductRepositoryStub()
    sut = new ImpGetProductDetailsByIdUseCase(getProductByIdWithVariationsRepository)
  })

  it('should get a product with its variations', async () => {
    const getByIdSpy = jest.spyOn(getProductByIdWithVariationsRepository, 'getById')

    const result = await sut.getOneById('any-product-id')

    expect(result).toBeDefined()
    expect(getByIdSpy).toHaveBeenCalledWith('any-product-id')
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('name')
    expect(result).toHaveProperty('description')
    expect(result).toHaveProperty('category')
    expect(result.variations).toHaveLength(1)
    expect(result.variations[0]).toHaveProperty('id')
    expect(result.variations[0]).toHaveProperty('price')
    expect(result.variations[0]).toHaveProperty('hasStock')
    expect(result.variations[0]).toHaveProperty('color')
    expect(result.variations[0]).toHaveProperty('size')
    expect(result.variations[0]).toHaveProperty('imageUrl')
  })

  it('should throw a not found exception if no product is found', async () => {
    getProductByIdWithVariationsRepository.getById = jest.fn().mockResolvedValue(Promise.resolve(null))

    const promise = sut.getOneById('any-product-id')

    await expect(promise).rejects.toThrowError(new NotFoundException('Product'))
  })

  it('should pass along any exception throw by GetProductByIdWithVariationsRepository.getById', async () => {
    getProductByIdWithVariationsRepository.getById = jest.fn().mockImplementation(() => { throw new Error('any-error') })

    const promise = sut.getOneById('any-product-id')

    await expect(promise).rejects.toThrowError(new Error('any-error'))
  })
})
