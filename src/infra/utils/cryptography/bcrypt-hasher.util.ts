import bcrypt from 'bcrypt'
import { Hasher } from "@/application/protocols/utils/cryptography/hasher.util";

export class BcryptHasher implements Hasher {

  constructor(private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }
}
