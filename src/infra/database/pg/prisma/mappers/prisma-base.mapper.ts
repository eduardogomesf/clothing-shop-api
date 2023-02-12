export class PrismaBaseMapper {
  public removeCreatedAtAndUpdatedAtProps (item: any) {
    const { createdAt, updatedAt, ...rest } = item
    return { ...rest }
  }
}
