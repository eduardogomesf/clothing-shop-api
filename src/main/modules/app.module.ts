import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeormConfig } from '../configs'
import { CustomerAddressModule } from './customer-address.module'
import { CustomerModule } from './customer.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    CustomerModule,
    CustomerAddressModule
  ]
})
export class AppModule {}
