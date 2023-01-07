export interface Encrypter {
  encrypt: (data: any) => Promise<string>
}
