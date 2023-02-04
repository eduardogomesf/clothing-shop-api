export interface GetCategorySubcategoryIdsByCategoryIdRepository {
  getAllByCategoryId: (categoryId: string) => Promise<{ id: string }[]>
}
