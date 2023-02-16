export class PrismaProductFilter {
  filters: any

  constructor() {
    this.filters = {
      where: {
        variations: {
          some: {}
        }
      },
      include: {
        variations: {
          where: {}
        }
      }
    }
  }

  reset () {
    this.filters = {
      where: {
        variations: {
          some: {}
        }
      },
      include: {
        variations: {
          where: {}
        }
      }
    }

    return this
  }

  addPagination (limit: number, page: number) {
    if (!limit || !page) return this

    const customPage = page > 0 ? (page - 1) : 0
    this.filters.take = Number(limit)
    this.filters.skip = Number(customPage * limit)

    return this
  }

  addSearch (search: string) {
    if (!search) return this

    if (!this.filters.where.OR) {
      this.filters.where.OR = []
    }

    this.filters.where.OR.push({
      name: {
        contains: search,
        mode: 'insensitive'
      }
    })
    this.filters.where.OR.push({
      description: {
        contains: search,
        mode: 'insensitive'
      }
    })

    return this
  }

  addMinPrice (minPrice: number) {
    const priceFilter = this.filters.where.variations.some.price ? this.filters.where.variations.some.price : {}

    this.filters.where.variations.some.price = {
      ...priceFilter,
      gte: Number(minPrice)
    }

    return this
  }

  addMaxPrice (maxPrice: number) {
    const priceFilter = this.filters.where.variations.some.price ? this.filters.where.variations.some.price : {}

    this.filters.where.variations.some.price = {
      ...priceFilter,
      lte: Number(maxPrice)
    }

    return this
  }

  addCategorySubcategoryIds (ids: string[]) {
    if (!ids || ids.length <= 0) return this

    this.filters.where = {
      ...this.filters.where,
      categorySubcategoryId: {
        in: ids
      }
    }

    return this
  }

  getResult () {
    return this.filters
  }
}
