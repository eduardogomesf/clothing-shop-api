import { GetProductDetailsByIdUseCase, GetProductDetailsByIdUseCaseResponse } from '@/domain/use-cases/product'
import { NotFoundException } from '../../exceptions'
import { GetProductByIdWithVariationsRepository } from '../../protocols/database/repositories/product/get-product-by-id-with-variations.repository'

export class ImpGetProductDetailsByIdUseCase implements GetProductDetailsByIdUseCase {
  constructor(
    private readonly getProductByIdWithVariationsRepository: GetProductByIdWithVariationsRepository
  ) {}

  async getOneById (id: string): Promise<GetProductDetailsByIdUseCaseResponse> {
    const product = await this.getProductByIdWithVariationsRepository.getById(id)

    if (!product) {
      throw new NotFoundException('Product')
    }

    const mappedProduct: GetProductDetailsByIdUseCaseResponse = {
      ...product,
      variations: product.variations.map(variation => {
        const { stock, ...rest } = variation
        return { ...rest, hasStock: stock > 0 }
      })
    }

    return mappedProduct
  }
}
