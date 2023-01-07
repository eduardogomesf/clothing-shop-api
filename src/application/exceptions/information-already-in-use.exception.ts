export class InformationAlreadyInUseException extends Error {
  constructor(fieldName: string) {
    super(`This ${fieldName} is already in use`)
  }

}
