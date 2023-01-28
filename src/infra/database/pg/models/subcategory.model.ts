import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { CategoryModel } from './category.model'

@Entity()
export class SubcategoryModel {
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
  categories: CategoryModel[]
}
