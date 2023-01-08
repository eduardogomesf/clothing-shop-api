import * as bcrypt from 'bcrypt'
import { Hasher, HashComparer } from '@/application/protocols/utils/cryptography/'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare (hash: string, value: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  };
}
