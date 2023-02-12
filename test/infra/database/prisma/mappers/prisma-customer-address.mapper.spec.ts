import { PrismaCustomerAddressMapper } from '../../../../../src/infra/database/pg/prisma/mappers'

describe('PrismaCustomerAddressMapper', () => {
  let sut: PrismaCustomerAddressMapper

  beforeEach(() => {
    sut = new PrismaCustomerAddressMapper()
  })

  it('should return a list of mapped addresses', () => {
    const result = sut.mapAddresses([
      {
        id: 'any-id',
        street: 'any-street',
        city: 'any-city',
        complement: 'any-complement',
        country: 'any-country',
        isMain: false,
        neighborhood: 'any-neighborhood',
        number: 100,
        postalCode: 'any-postal-code',
        state: 'any-state',
        createdAt: new Date(),
        updatedAt: new Date(),
        customerId: 'any-customer-id'
      }
    ])

    expect(result).toEqual([
      {
        id: 'any-id',
        street: 'any-street',
        city: 'any-city',
        complement: 'any-complement',
        country: 'any-country',
        isMain: false,
        neighborhood: 'any-neighborhood',
        number: 100,
        postalCode: 'any-postal-code',
        state: 'any-state'
      }
    ])
  })

  it('should return an empty list of addresses', () => {
    const result = sut.mapAddresses([])
    expect(result).toEqual([])
  })
})
