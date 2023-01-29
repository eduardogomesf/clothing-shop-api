import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Subcategory } from '@/domain/entities/subcategory'
import { CategoryModel } from './category.model'

@Entity()
export class SubcategoryModel implements Subcategory {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  description?: string

  @ManyToMany(type => CategoryModel, category => category.subcategories)
  @JoinTable({
    name: 'categories_subcategories',
    joinColumn: { name: 'subcategory_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' }
  })
  categories?: CategoryModel[]
}
