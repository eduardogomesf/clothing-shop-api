import { PrismaBaseMapper } from './prisma-base.mapper'
import { CustomerAddress as PrismaCustomerAddress } from '@prisma/client'
import { CustomerAddress } from '@/domain/entities'

export class PrismaCustomerAddressMapper extends PrismaBaseMapper {
  mapAddresses (addresses: PrismaCustomerAddress[]): CustomerAddress[] {
    return addresses.map(product => {
      const modifiedCustomerAddress: CustomerAddress = this.removeCreatedAtAndUpdatedAtProps(product)
      delete modifiedCustomerAddress.customerId
      return modifiedCustomerAddress
    })
  }
}
