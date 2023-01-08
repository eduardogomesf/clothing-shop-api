import { Customer } from '@/domain/entities/customer'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

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
}
