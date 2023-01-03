import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'

dotenv.config()

export const typeormConfig = {
  type: (process.env.R_DB_TYPE || 'postgres') as any,
  host: process.env.R_DB_HOST || 'localhost',
  port: (process.env.R_DB_PORT || 5433) as number,
  username: process.env.R_DB_USERNAME || 'postgres',
  password: process.env.R_DB_PASSWORD || 'postgres',
  database: process.env.R_DB_DATABASE || 'postgres',
  entities: [],
}

export default new DataSource(typeormConfig)

