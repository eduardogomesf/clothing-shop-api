import { Hasher } from "@/application/protocols/utils/cryptography/hasher.util"
import * as bcrypt from 'bcrypt'
import { BcryptHasher } from "../../../src/infra/utils/cryptography/bcrypt-hasher.util"

jest.mock('bcrypt', () => {
  return {
    hash: () => {
      return Promise.resolve('hashed-value' as never)
    }
  }
})

describe('Bcrypt Hasher', () => {
  let bcryptHasher: Hasher

  beforeEach(() => {
    bcryptHasher = new BcryptHasher(8)
  })

  it('should return a hashed string', async () => {
    const result = await bcryptHasher.hash('any-value')
    expect(result).toBe('hashed-value')
  })

  it('should call Bcrypt.hash with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await bcryptHasher.hash('any-value')
    expect(hashSpy).toHaveBeenCalledWith('any-value', 8)
  })

  it('should pass along any error thrown by Bcrypt.hash', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error('any-error')
    })
    const promise = bcryptHasher.hash('any-value')
    await expect(promise).rejects.toThrowError(new Error('any-error'))
  })
})
