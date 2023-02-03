import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeormConfig } from '../configs'
import { CategoryModule } from './category.module'
import { CustomerAddressModule } from './customer-address.module'
import { CustomerModule } from './customer.module'
import { ProductModule } from './product.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    CustomerModule,
    CustomerAddressModule,
    CategoryModule,
    ProductModule
  ]
})
export class AppModule {}
