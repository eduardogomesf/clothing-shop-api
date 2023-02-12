// import { NotFoundException } from '../../../../src/application/exceptions'
// import { GetCategorySubcategoryIdByCategoryAndSubCategoryRepository, GetCategorySubcategoryIdsByCategoryIdRepository } from '../../../../src/application/protocols/database/repositories/category'
import { GetAllProductsWithFiltersRepository } from '../../../../src/application/protocols/database/repositories/product/get-all-products-with-filters.repository'
import { ImpGetProductsUseCase } from '../../../../src/application/use-cases/product/imp-get-products.use-case'
// import { CategorySubcategoryRepositoryStub } from '../../mocks/databases/category-subcategory.repository.mock'
import { ProductRepositoryStub } from '../../mocks/databases/product.repository.mock'

describe('GetProductsUseCase', () => {
  let sut: ImpGetProductsUseCase
  let getAllProductsWithFiltersRepository: GetAllProductsWithFiltersRepository
  // let getCategorySubcategoryIdByCategoryAndSubCategoryRepository: GetCategorySubcategoryIdByCategoryAndSubCategoryRepository
  // let getCategorySubcategoryIdsByCategoryIdRepository: GetCategorySubcategoryIdsByCategoryIdRepository

  const filters = { itemsPerPage: 10, page: 1 }

  beforeEach(() => {
    getAllProductsWithFiltersRepository = new ProductRepositoryStub()
    // getCategorySubcategoryIdByCategoryAndSubCategoryRepository = new CategorySubcategoryRepositoryStub()
    // getCategorySubcategoryIdsByCategoryIdRepository = new CategorySubcategoryRepositoryStub()
    sut = new ImpGetProductsUseCase(
      getAllProductsWithFiltersRepository
    )
  })

  it('should get a list of products with its variations with default filters', async () => {
    const getAllSpy = jest.spyOn(getAllProductsWithFiltersRepository, 'getWithFilters')
    // const getOneSpy = jest.spyOn(getCategorySubcategoryIdByCategoryAndSubCategoryRepository, 'getOne')
    // const getAllByCategoryIdSpy = jest.spyOn(getCategorySubcategoryIdsByCategoryIdRepository, 'getAllByCategoryId')

    const result = await sut.get(filters)

    const getAllSpyExpectedParams = {
      page: filters.page,
      limit: filters.itemsPerPage,
      maxPrice: 9999999999999,
      minPrice: 0,
      search: '',
      outOfStock: false,
      categorySubcategoryIds: []
    }

    expect(result).toBeDefined()
    expect(getAllSpy).toHaveBeenCalledWith(getAllSpyExpectedParams)
    // expect(getOneSpy).toHaveBeenCalledTimes(0)
    // expect(getAllByCategoryIdSpy).toHaveBeenCalledTimes(0)
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

  // it('should get a list of products with its variations with all filters', async () => {
  //   const getAllSpy = jest.spyOn(getAllProductsWithFiltersRepository, 'getWithFilters')
  //   const getOneSpy = jest.spyOn(getCategorySubcategoryIdByCategoryAndSubCategoryRepository, 'getOne')

  //   const customFilters = { ...filters, categoryId: 'any-category-id', subcategoryId: 'any-subcategory-id', maxPrice: 5600, minPrice: 100, search: 'Cotton' }

  //   const result = await sut.get(customFilters)

  //   const getAllByCategoryIdSpyExpectedParams = {
  //     limit: filters.itemsPerPage,
  //     page: filters.page,
  //     outOfStock: false,
  //     maxPrice: 5600,
  //     minPrice: 100,
  //     search: 'Cotton',
  //     categorySubcategoryIds: ['any-category-subcategory-id']
  //   }

  //   expect(result).toBeDefined()
  //   expect(getAllSpy).toHaveBeenCalledWith(getAllByCategoryIdSpyExpectedParams)
  //   expect(getOneSpy).toHaveBeenCalledWith({ categoryId: 'any-category-id', subcategoryId: 'any-subcategory-id' })
  //   expect(result).toHaveLength(1)
  //   expect(result[0]).toHaveProperty('id')
  //   expect(result[0]).toHaveProperty('name')
  //   expect(result[0]).toHaveProperty('categorySubCategoryId')
  //   expect(result[0].variations).toHaveLength(1)
  //   expect(result[0].variations[0]).toHaveProperty('id')
  //   expect(result[0].variations[0]).toHaveProperty('price')
  //   expect(result[0].variations[0]).toHaveProperty('stock')
  //   expect(result[0].variations[0]).toHaveProperty('productId')
  //   expect(result[0].variations[0]).toHaveProperty('color')
  //   expect(result[0].variations[0]).toHaveProperty('size')
  //   expect(result[0].variations[0]).toHaveProperty('imageUrl')
  // })

  // it('should get a list of products with its variations with all filters except subcategoryId', async () => {
  //   const getAllSpy = jest.spyOn(getAllProductsWithFiltersRepository, 'getWithFilters')
  //   const getAllByCategoryIdSpy = jest.spyOn(getCategorySubcategoryIdsByCategoryIdRepository, 'getAllByCategoryId')

  //   const customFilters = { ...filters, categoryId: 'any-category-id', maxPrice: 5600, minPrice: 100, search: 'Cotton' }

  //   const result = await sut.get(customFilters)

  //   const getAllByCategoryIdSpyExpectedParams = {
  //     limit: filters.itemsPerPage,
  //     page: filters.page,
  //     outOfStock: false,
  //     maxPrice: 5600,
  //     minPrice: 100,
  //     search: 'Cotton',
  //     categorySubcategoryIds: ['any-category-subcategory-id', 'any-category-subcategory-id-2']
  //   }

  //   expect(result).toBeDefined()
  //   expect(getAllSpy).toHaveBeenCalledWith(getAllByCategoryIdSpyExpectedParams)
  //   expect(getAllByCategoryIdSpy).toHaveBeenCalledWith('any-category-id')
  //   expect(result).toHaveLength(1)
  //   expect(result[0]).toHaveProperty('id')
  //   expect(result[0]).toHaveProperty('name')
  //   expect(result[0]).toHaveProperty('categorySubCategoryId')
  //   expect(result[0].variations).toHaveLength(1)
  //   expect(result[0].variations[0]).toHaveProperty('id')
  //   expect(result[0].variations[0]).toHaveProperty('price')
  //   expect(result[0].variations[0]).toHaveProperty('stock')
  //   expect(result[0].variations[0]).toHaveProperty('productId')
  //   expect(result[0].variations[0]).toHaveProperty('color')
  //   expect(result[0].variations[0]).toHaveProperty('size')
  //   expect(result[0].variations[0]).toHaveProperty('imageUrl')
  // })

  it('should get a empty list if repository returns an empty array', async () => {
    getAllProductsWithFiltersRepository.getWithFilters = jest.fn().mockResolvedValueOnce(Promise.resolve([]))
    const result = await sut.get(filters)

    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  // it('should throw a not found exception if no category subcategory id is found by categoryId and subcategoryId filters', async () => {
  //   getCategorySubcategoryIdByCategoryAndSubCategoryRepository.getOne = jest.fn().mockResolvedValue(Promise.resolve(null))

  //   const customFilters = { ...filters, categoryId: 'any-category-id', subcategoryId: 'any-subcategory-id', maxPrice: 5600, minPrice: 100, search: 'Cotton' }

  //   const promise = sut.get(customFilters)
  //   expect(promise).rejects.toThrowError(new NotFoundException('Category'))
  // })

  // it('should throw a not found exception if no category subcategory ids is found by categoryId filter', async () => {
  //   getCategorySubcategoryIdsByCategoryIdRepository.getAllByCategoryId = jest.fn().mockResolvedValue(Promise.resolve([]))

  //   const customFilters = { ...filters, categoryId: 'any-category-id' }

  //   const promise = sut.get(customFilters)
  //   expect(promise).rejects.toThrowError(new NotFoundException('Category'))
  // })

  // it('should pass along any exception thrown by getCategorySubcategoryIdsByCategoryIdRepository.getAllByCategoryId', async () => {
  //   getCategorySubcategoryIdsByCategoryIdRepository.getAllByCategoryId = jest.fn().mockImplementation(() => { throw new Error('any_error') })

  //   const customFilters = { ...filters, categoryId: 'any-category-id' }

  //   const promise = sut.get(customFilters)
  //   expect(promise).rejects.toThrowError(new Error('any_error'))
  // })

  // it('should pass along any exception thrown by GetCategorySubcategoryIdByCategoryAndSubCategoryRepository.getOne', async () => {
  //   getCategorySubcategoryIdByCategoryAndSubCategoryRepository.getOne = jest.fn().mockImplementation(() => { throw new Error('any_error') })

  //   const customFilters = { ...filters, categoryId: 'any-category-id', subcategoryId: 'any-subcategory-id' }

  //   const promise = sut.get(customFilters)
  //   expect(promise).rejects.toThrowError(new Error('any_error'))
  // })

  it('should pass along any exception thrown by GetAllProductsWithFiltersRepository.getWithFilters', async () => {
    getAllProductsWithFiltersRepository.getWithFilters = jest.fn().mockImplementation(() => { throw new Error('any_error') })
    const promise = sut.get(filters)
    expect(promise).rejects.toThrowError(new Error('any_error'))
  })
})
