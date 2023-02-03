import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GetAllProductsWithFiltersRepository } from '@/application/protocols/database/repositories/product'
import { Product } from '@/domain/entities/product'
import { ProductModel } from '../models'

@Injectable()
export class PgProductRepository implements GetAllProductsWithFiltersRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly repository: Repository<ProductModel>
  ) {}

  async getWithFilters (): Promise<Product[]> {
    return this.repository.find({ relations: { variations: true } })
  }
}
