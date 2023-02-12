import { PrismaCategoryMapper } from '../../../../../src/infra/database/pg/prisma/mappers'

describe('PrismaCategoryMapper', () => {
  let sut: PrismaCategoryMapper

  beforeEach(() => {
    sut = new PrismaCategoryMapper()
  })

  it('should return a list of mapped categories', () => {
    const result = sut.mapCategories([
      {
        id: 'any-id',
        name: 'any-name',
        description: 'any-description',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoriesSubCategories: [{
          id: 'any-category-subcategory-id',
          categoryId: 'any-category-id',
          subcategoryId: 'any-subcategory-id',
          subcategory: {
            id: 'any-subcategory-id',
            name: 'any-subcategory-name',
            description: 'any-description',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }]
      }
    ])
    expect(result).toEqual([{
      id: 'any-id',
      name: 'any-name',
      description: 'any-description',
      subcategories: [{
        id: 'any-subcategory-id',
        name: 'any-subcategory-name',
        description: 'any-description'
      }]
    }])
  })

  it('should return an empty list of categories', () => {
    const result = sut.mapCategories([])
    expect(result).toEqual([])
  })
})
