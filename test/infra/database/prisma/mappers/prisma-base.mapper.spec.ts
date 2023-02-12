import { PrismaBaseMapper } from '../../../../../src/infra/database/pg/prisma/mappers'

describe('PrismaBaseMapper', () => {
  let sut: PrismaBaseMapper

  beforeEach(() => {
    sut = new PrismaBaseMapper()
  })

  it('should return a object without createdAt and updatedAt props', () => {
    const result = sut.removeCreatedAtAndUpdatedAtProps({ id: 'any-id', name: 'any-name', createdAt: 'any-created-at-date', updatedAt: 'any-updated-at-date' })
    expect(result).toEqual({ id: 'any-id', name: 'any-name' })
  })
})
