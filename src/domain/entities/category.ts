import { Subcategory } from './subcategory'

export interface Category {
  id: string
  name: string
  description?: string
  subcategories: Subcategory[]
}
