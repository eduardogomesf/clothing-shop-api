import { CustomerAddress } from '@/domain/entities'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CustomerModel } from './customer.model'

@Entity({
  name: 'customer_addresses'
})
export class CustomerAddressModel implements CustomerAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  street: string

  @Column('int')
  number: number

  @Column()
  neighborhood: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  country: string

  @Column({
    name: 'postal_code'
  })
  postalCode: string

  @Column()
  complement?: string

  @Column({
    name: 'is_main'
  })
  isMain: boolean

  @Column()
  customerId: string

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: string

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: string

  @ManyToOne(() => CustomerModel, (customer) => customer.addresses)
  customer: CustomerModel
}