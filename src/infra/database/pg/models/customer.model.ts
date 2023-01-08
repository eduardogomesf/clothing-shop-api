import { Customer } from '@/domain/entities'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CustomerAddressModel } from './customer-address.model'

@Entity({
  name: 'customers'
})
export class CustomerModel implements Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({
    name: 'cellphone_number'
  })
  cellphoneNumber: string

  @Column('')
  email: string

  @Column()
  password: string

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: string

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: string

  @OneToMany(() => CustomerAddressModel, (address) => address.customer)
  addresses: CustomerAddressModel[]
}
