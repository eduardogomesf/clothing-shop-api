import { Product } from '@/domain/entities/product'
import { Column, OneToMany, PrimaryColumn } from 'typeorm'
import { ProductVariationModel } from './product-variation.model'

export class ProductModel implements Product {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description?: string

  @Column({
    name: 'category_subcategory_id'
  })
  categorySubCategoryId: string

  @OneToMany(() => ProductVariationModel, (productVariation) => productVariation.product)
  variations?: ProductVariationModel[]
}
