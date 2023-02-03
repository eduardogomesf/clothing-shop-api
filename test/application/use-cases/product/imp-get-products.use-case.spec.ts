import { GetAllProductsWithFiltersRepository } from '../../../../src/application/protocols/database/repositories/product/get-all-products-with-filters.repository'
import { ImpGetProductsUseCase } from '../../../../src/application/use-cases/product/imp-get-products.use-case'
import { ProductRepositoryStub } from '../../mocks/databases/product.repository.mock'

describe('GetProductsUseCase', () => {
  let sut: ImpGetProductsUseCase
  let getAllProductsWithFiltersRepository: GetAllProductsWithFiltersRepository

  beforeEach(() => {
    getAllProductsWithFiltersRepository = new ProductRepositoryStub()
    sut = new ImpGetProductsUseCase(getAllProductsWithFiltersRepository)
  })

  it('should get a list of products with its variations', async () => {
    const getAllSpy = jest.spyOn(getAllProductsWithFiltersRepository, 'getWithFilters')

    const result = await sut.get()

    expect(result).toBeDefined()
    expect(getAllSpy).toHaveBeenCalledTimes(1)
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('id')
    expect(result[0]).toHaveProperty('name')
    expect(result[0]).toHaveProperty('categorySubCategoryId')
    expect(result[0].variations).toHaveLength(1)
    expect(result[0].variations[0]).toHaveProperty('id')
    expect(result[0].variations[0]).toHaveProperty('price')
    expect(result[0].variations[0]).toHaveProperty('stock')
    expect(result[0].variations[0]).toHaveProperty('productId')
    expect(result[0].variations[0]).toHaveProperty('color')
    expect(result[0].variations[0]).toHaveProperty('size')
    expect(result[0].variations[0]).toHaveProperty('imageUrl')
  })

  it('should get a empty list if repository returns null', async () => {
    getAllProductsWithFiltersRepository.getWithFilters = jest.fn().mockResolvedValueOnce(Promise.resolve(null))
    const result = await sut.get()

    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  it('should get a empty list if repository returns an empty array', async () => {
    getAllProductsWithFiltersRepository.getWithFilters = jest.fn().mockResolvedValueOnce(Promise.resolve([]))
    const result = await sut.get()

    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  it('should pass along any exception thrown by GetAllProductsWithFiltersRepository.getWithFilters', async () => {
    getAllProductsWithFiltersRepository.getWithFilters = jest.fn().mockImplementation(() => { throw new Error('any_error') })
    const promise = sut.get()
    expect(promise).rejects.toThrowError(new Error('any_error'))
  })
})
