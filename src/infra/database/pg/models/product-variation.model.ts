import { ProductVariation } from '@/domain/entities/product-variation'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Product } from '../../../../domain/entities/product'
import { ProductModel } from './product.model'

@Entity('product_variations')
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

  @Column({
    name: 'image_url',
    type: 'varchar'
  })
  imageUrl?: string

  @ManyToOne(() => ProductModel, (product) => product.variations)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product
}
