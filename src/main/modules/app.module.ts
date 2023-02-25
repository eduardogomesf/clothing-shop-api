import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CategoryModule } from './category.module'
import { CustomerAddressModule } from './customer-address.module'
import { CustomerModule } from './customer.module'
import { PaymentMethodModule } from './payment-method.module'
import { ProductModule } from './product.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    CustomerModule,
    CustomerAddressModule,
    CategoryModule,
    ProductModule,
    PaymentMethodModule
  ]
})
export class AppModule {}
