export class NotFoundException extends Error {
  constructor(entityName: string) {
    super(`${entityName} not found`)
  }
}
