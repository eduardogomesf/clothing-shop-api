import * as jwt from 'jsonwebtoken'
import { Encrypter } from "@/application/protocols/utils/cryptography";

export class JwtAdapter implements Encrypter {
  constructor(private readonly expirationTime: string, private readonly secret: string) {}

  async encrypt (data: any): Promise<string> {
    return jwt.sign(
      { ...data },
      this.secret,
      {
        expiresIn: this.expirationTime
      }
    )
  };

}
