import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createProductVariationsTable1675023188766 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_variations',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'price',
            type: 'float'
          },
          {
            name: 'color',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'size',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'image_url',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'stock',
            type: 'integer'
          },
          {
            name: 'product_id',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )

    await queryRunner.createForeignKey('product_variations', new TableForeignKey({
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      name: 'products_fk'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product_variations', 'products_fk')
    await queryRunner.dropTable('product_variations')
  }
}
