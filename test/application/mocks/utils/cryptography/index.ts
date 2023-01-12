import { Hasher, HashComparer, Encrypter } from '@/application/protocols/utils/cryptography'

export class HasherStub implements Hasher {
  hash (value: string): Promise<string> {
    return Promise.resolve('hashed-value')
  }
}

export class HashComparerStub implements HashComparer {
  compare (hash: string, value: string): Promise<boolean> {
    return Promise.resolve(true)
  };
}

export class EncrypterStub implements Encrypter {
  encrypt (data: any): Promise<string> {
    return Promise.resolve('token')
  };
}
