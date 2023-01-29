import { GetCategoriesWithSubCategoriesRepository } from '../../../../src/application/protocols/database/repositories/category/get-categories-with-subcategories.repository'
import { ImpGetCategoriesWithSubCategoriesUseCase } from '../../../../src/application/use-cases/category/imp-get-categories-with-subcategories.use-case'
import { CategoryRepositoryStub } from '../../mocks/databases/category.repository.mock'

describe('GetCategoriesWithSubCategoriesUseCase', () => {
  let sut: ImpGetCategoriesWithSubCategoriesUseCase
  let getCategoriesWithSubCategoriesRepository: GetCategoriesWithSubCategoriesRepository

  beforeEach(() => {
    getCategoriesWithSubCategoriesRepository = new CategoryRepositoryStub()
    sut = new ImpGetCategoriesWithSubCategoriesUseCase(getCategoriesWithSubCategoriesRepository)
  })

  it('should get a list of categories with its subcategories', async () => {
    const getAllSpy = jest.spyOn(getCategoriesWithSubCategoriesRepository, 'getAll')

    const result = await sut.get()

    expect(result).toBeDefined()
    expect(getAllSpy).toHaveBeenCalledTimes(1)
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('id')
    expect(result[0]).toHaveProperty('name')
    expect(result[0]).toHaveProperty('subcategories')
    expect(result[0].subcategories).toHaveLength(1)
    expect(result[0].subcategories[0]).toHaveProperty('id')
    expect(result[0].subcategories[0]).toHaveProperty('name')
  })

  it('should get a empty list if repository returns null', async () => {
    getCategoriesWithSubCategoriesRepository.getAll = jest.fn().mockResolvedValueOnce(Promise.resolve(null))
    const result = await sut.get()

    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  it('should get a empty list if repository returns an empty array', async () => {
    getCategoriesWithSubCategoriesRepository.getAll = jest.fn().mockResolvedValueOnce(Promise.resolve([]))
    const result = await sut.get()

    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  it('should pass along any exception thrown by GetCategoriesWithSubCategoriesRepository.getAll', async () => {
    getCategoriesWithSubCategoriesRepository.getAll = jest.fn().mockImplementation(() => { throw new Error('any_error') })
    const promise = sut.get()

    expect(promise).rejects.toThrowError(new Error('any_error'))
  })
})
