export class PrismaBaseMapper {
  protected removeCreatedAtAndUpdatedAtProps (item: any) {
    const { createdAt, updatedAt, ...rest } = item
    return { ...rest }
  }
}
