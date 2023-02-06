import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GetCategoriesWithSubCategoriesRepository } from '@/application/protocols/database/repositories/category'
import { CategoryModel } from '../models/category.model'

@Injectable()
export class PgCategoryRepository implements GetCategoriesWithSubCategoriesRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly repository: Repository<CategoryModel>
  ) {}

  async getAll (): Promise<CategoryModel[]> {
    return await this.repository.find()
  }
}
