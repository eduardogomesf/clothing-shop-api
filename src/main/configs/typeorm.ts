import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { CustomerModel } from "@/infra/database/pg/models/customer.model"

dotenv.config()

export const typeormConfig: TypeOrmModuleOptions = {
  type: (process.env.R_DB_TYPE || 'postgres') as any,
  host: process.env.R_DB_HOST || 'localhost',
  port: (process.env.R_DB_PORT || 5433) as number,
  username: process.env.R_DB_USERNAME || 'postgres',
  password: process.env.R_DB_PASSWORD || 'postgres',
  database: process.env.R_DB_DATABASE || 'postgres',
  entities: [CustomerModel],
  migrations: ['./dist/infra/database/pg/migrations/*.js']
}

export default new DataSource(typeormConfig as any)
