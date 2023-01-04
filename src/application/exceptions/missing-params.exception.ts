export class MissingParamsException extends Error {
  public readonly missingParams: string[]

  constructor(missingParams: string[]) {
    super('Missing params')

    this.missingParams = missingParams
  }

}
