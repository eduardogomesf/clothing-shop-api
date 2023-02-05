export type GetProductsQueryParams = {
  minPrice?: number
  maxPrice?: number
  search?: string
  categoryId?: string
  subcategoryId?: string
  withoutStock?: boolean
  page: number
  itemsPerPage: number
}
