import { Category } from './category'

export interface Subcategory {
  id: string
  name: string
  description?: string
  categories: Category[]
}
