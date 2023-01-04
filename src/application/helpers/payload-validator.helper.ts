export class PayloadValidator {

  static isAnyParamMissing (requiredParams: string[], object: any) {
    const missingParams = []

    requiredParams.forEach(param => {
      if (!object[param]) {
        missingParams.push(param)
      }
    })

    if (missingParams.length > 0) {
      return {
        error: true,
        missingParams,
      }
    }

    return {
      error: false,
      missingParams: []
    }
  }

}
