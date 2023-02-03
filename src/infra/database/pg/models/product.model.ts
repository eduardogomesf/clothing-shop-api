import { Product } from '@/domain/entities/product'
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { ProductVariationModel } from './product-variation.model'

@Entity('products')
export class ProductModel implements Product {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description?: string

  @Column({
    name: 'category_subcategory_id',
    type: 'uuid'
  })
  categorySubCategoryId: string

  @OneToMany(() => ProductVariationModel, (productVariation) => productVariation.product)
  variations?: ProductVariationModel[]
}
