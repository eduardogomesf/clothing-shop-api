import * as dotenv from 'dotenv'

dotenv.config()

export const ENVS = {
  APP: {
    PORT: process.env.APP_PORT || 3000
  },
  SECRETS: {
    JWT_SECRET: process.env.JWT_SECRET
  }
} as const
