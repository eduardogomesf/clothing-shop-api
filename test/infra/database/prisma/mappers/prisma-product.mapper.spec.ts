import { PrismaProductMapper } from '../../../../../src/infra/database/pg/prisma/mappers'

describe('PrismaProductMapper', () => {
  let sut: PrismaProductMapper

  beforeEach(() => {
    sut = new PrismaProductMapper()
  })

  describe('mapProductsWithVariations()', () => {
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

  describe('mapProductDetailsWithVariations()', () => {
    it('should return a product details with its variation', () => {
      const result = sut.mapProductDetailsWithVariations({
        id: 'any-product-id',
        name: 'any-product-name',
        description: 'any-description-description',
        createdAt: new Date(),
        updatedAt: new Date(),
        categorySubcategory: {
          id: 'any-category-subcategory-id',
          subcategoryId: 'any-subcategory-id',
          categoryId: 'any-category-id',
          category: {
            id: 'any-category-id',
            name: 'any-category-name',
            description: 'any-category-description',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          subcategory: {
            id: 'any-subcategory-id',
            name: 'any-subcategory-name',
            description: 'any-subcategory-description',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        },
        categorySubcategoryId: 'any-category-subcategory-id',
        variations: [{
          id: 'any-variation-id',
          color: 'any-color',
          createdAt: new Date(),
          updatedAt: new Date(),
          imageUrl: 'any-image-url',
          price: 0,
          productId: 'any-product-id',
          size: 'any-size',
          stock: 10
        }]
      })
      expect(result).toEqual({
        id: 'any-product-id',
        name: 'any-product-name',
        description: 'any-description-description',
        category: {
          id: 'any-category-id',
          name: 'any-category-name',
          subcategory: {
            id: 'any-subcategory-id',
            name: 'any-subcategory-name'
          }
        },
        variations: [{
          id: 'any-variation-id',
          color: 'any-color',
          imageUrl: 'any-image-url',
          price: 0,
          size: 'any-size',
          stock: 10
        }]
      })
    })

    it('should return null if no product is found', () => {
      const result = sut.mapProductDetailsWithVariations(null as any)
      expect(result).toBeNull()
    })
  })
})
