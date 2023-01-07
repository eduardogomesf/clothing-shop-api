import * as jwt from 'jsonwebtoken'
import { JwtAdapter } from '../../../src/infra/utils/cryptography'

jest.mock('jsonwebtoken', () => {
  return {
    sign: () => {
      return 'token'
    }
  }
})

describe('Encrypter', () => {
  let encrypter: JwtAdapter

  beforeEach(() => {
    encrypter = new JwtAdapter('1d', 'any-secret')
  })

  describe('encrypt', () => {
    it('should return a token', async () => {
      const result = await encrypter.encrypt({ id: 'any-id' })
      expect(result).toBe('token')
    })

    it('should call Jwt.sign with correct values', async () => {
      const signSpy = jest.spyOn(jwt, 'sign')
      await encrypter.encrypt({ id: 'any-id' })
      expect(signSpy).toHaveBeenCalledWith({ id: 'any-id' }, 'any-secret', { expiresIn: '1d' })
    })

    it('should pass along any error thrown by Jwt.sign', async () => {
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error('any-error')
      })
      const promise = encrypter.encrypt({ id: 'any-id' })
      await expect(promise).rejects.toThrowError(new Error('any-error'))
    })
  })
})
