import { v4 as uuid } from 'uuid'

export class Logger {
  private static getDateWithTime () {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour12: true
    }

    return new Intl.DateTimeFormat('pt-BR', options).format(new Date())
  }

  public static logError (source: string, error: any) {
    const time = Logger.getDateWithTime()
    const message = error.message ? error.message : 'No error provided'

    const logBody = {
      id: uuid(),
      source,
      time,
      message
    }

    console.error(`Error: ${JSON.stringify(logBody)}`)
  }
}
