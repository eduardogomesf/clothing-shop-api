import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { CustomerModel, CustomerAddressModel, CategoryModel, SubcategoryModel, ProductModel, ProductVariationModel } from '../../infra/database/pg/typeorm/models'

dotenv.config()

export const typeormConfig: TypeOrmModuleOptions = {
  type: (process.env.R_DB_TYPE || 'postgres') as any,
  host: process.env.R_DB_HOST || 'localhost',
  port: (process.env.R_DB_PORT || 5433) as number,
  username: process.env.R_DB_USERNAME || 'postgres',
  password: process.env.R_DB_PASSWORD || 'postgres',
  database: process.env.R_DB_DATABASE || 'postgres',
  entities: [CustomerModel,
    CustomerAddressModel,
    CategoryModel,
    SubcategoryModel,
    ProductModel,
    ProductVariationModel
  ],
  migrations: ['./dist/infra/database/pg/migrations/typeorm/*.js']
}

export default new DataSource(typeormConfig as any)
