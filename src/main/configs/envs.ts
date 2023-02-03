import * as dotenv from 'dotenv'

dotenv.config()

export const ENVS = {
  APP: {
    PORT: process.env.APP_PORT || 3000
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRATION_IN_DAYS: process.env.EXPIRATION_IN_DAYS || '1d'
  }
}
