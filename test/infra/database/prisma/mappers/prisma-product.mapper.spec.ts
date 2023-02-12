import { PrismaProductMapper } from '../../../../../src/infra/database/pg/prisma/mappers'

describe('PrismaProductMapper', () => {
  let sut: PrismaProductMapper

  beforeEach(() => {
    sut = new PrismaProductMapper()
  })

  it('should return a list of mapped products with its variations', () => {
    const result = sut.mapProductsWithVariations([
      {
        id: 'any-id',
        name: 'any-name',
        description: 'any-description',
        categorySubcategoryId: 'any-category-subcategory-id',
        createdAt: new Date(),
        updatedAt: new Date(),
        variations: [{
          id: 'any-variation-id',
          color: 'any-color',
          createdAt: new Date(),
          imageUrl: 'any-image-url',
          price: 50,
          productId: 'any-product-id',
          size: 'any-size',
          stock: 50,
          updatedAt: new Date()
        }]
      }
    ])
    expect(result).toEqual([
      {
        id: 'any-id',
        name: 'any-name',
        description: 'any-description',
        categorySubcategoryId: 'any-category-subcategory-id',
        variations: [{
          id: 'any-variation-id',
          color: 'any-color',
          imageUrl: 'any-image-url',
          price: 50,
          size: 'any-size',
          stock: 50
        }]
      }
    ])
  })

  it('should return an empty list of products', () => {
    const result = sut.mapProductsWithVariations([])
    expect(result).toEqual([])
  })
})
