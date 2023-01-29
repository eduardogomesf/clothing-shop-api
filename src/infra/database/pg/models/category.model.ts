import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Category } from '@/domain/entities/category'
import { SubcategoryModel } from './subcategory.model'

@Entity()
export class CategoryModel implements Category {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  description?: string

  @ManyToMany(type => SubcategoryModel, subcategory => subcategory.categories)
  @JoinTable({
    name: 'categories_subcategories',
    joinColumn: { name: 'category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'subcategory_id', referencedColumnName: 'id' }
  })
  subcategories?: SubcategoryModel[]
}
