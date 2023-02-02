import { ProductVariation } from '@/domain/entities/product-variation'
import { Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Product } from '../../../../domain/entities/product'
import { ProductModel } from './product.model'

export class ProductVariationModel implements ProductVariation {
  @PrimaryColumn('uuid')
  id: string

  @Column('integer')
  price: number

  @Column('integer')
  stock: number

  @Column({
    name: 'product_id',
    type: 'uuid'
  })
  productId: string

  @Column('varchar')
  color?: string

  @Column('varchar')
  size?: string

  @Column('varchar')
  imageUrl?: string

  @ManyToOne(() => ProductModel, (product) => product.variations)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product
}
