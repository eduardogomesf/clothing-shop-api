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

  public static logError (source: string, customMessage: string) {
    console.log(`[${source}] -> ${customMessage} | [${Logger.getDateWithTime()}] `)
  }
}
