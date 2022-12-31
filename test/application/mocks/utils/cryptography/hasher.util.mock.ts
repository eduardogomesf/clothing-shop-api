import { Hasher } from "@/application/protocols/utils/cryptography/hasher.util";

export class HasherStub implements Hasher {
  hash (value: string): Promise<string> {
    return Promise.resolve('hashed-value')
  }
}
