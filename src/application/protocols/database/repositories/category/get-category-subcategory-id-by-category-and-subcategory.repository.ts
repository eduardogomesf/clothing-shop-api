export type GetCategorySubcategoryIdByCategoryAndSubCategoryRepositoryDTO = {
  categoryId: string
  subcategoryId: string
}

export interface GetCategorySubcategoryIdByCategoryAndSubCategoryRepository {
  getOne: (dto: GetCategorySubcategoryIdByCategoryAndSubCategoryRepositoryDTO) => Promise<{ id: string }>
}
