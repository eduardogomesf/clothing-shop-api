import * as bcrypt from 'bcrypt'
import { BcryptHasher } from "../../../src/infra/utils/cryptography/bcrypt-hasher.util"

jest.mock('bcrypt', () => {
  return {
    hash: () => {
      return Promise.resolve('hashed-value' as never)
    },
    compare: () => {
      return Promise.resolve(true)
    }
  }
})

describe('Bcrypt Hasher', () => {
  let bcryptHasher: BcryptHasher

  beforeEach(() => {
    bcryptHasher = new BcryptHasher(8)
  })

  describe('hash', () => {
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

  describe('compare', () => {
    it('should return the result of the comparison', async () => {
      const result = await bcryptHasher.compare('hashed-value', 'value')
      expect(result).toBe(true)
    })

    it('should call Bcrypt.compare with correct values', async () => {
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await bcryptHasher.compare('hashed-value', 'value')
      expect(compareSpy).toBeCalledWith('value', 'hashed-value')
    })

    it('should pass along any error thrown by Bcrypt.compare', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error('any-error')
      })
      const promise = bcryptHasher.compare('hashed-value', 'value')
      await expect(promise).rejects.toThrowError(new Error('any-error'))
    })
  })
})
