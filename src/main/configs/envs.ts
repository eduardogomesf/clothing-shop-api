import {} from 'dotenv'

export const ENVS = {
  APP: {
    PORT: process.env.APP_PORT || 3000
  }
} as const
