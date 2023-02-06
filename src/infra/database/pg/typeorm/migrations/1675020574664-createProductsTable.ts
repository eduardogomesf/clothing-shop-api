import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createProductsTable1675020574664 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'category_subcategory_id',
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

    await queryRunner.createForeignKey('products', new TableForeignKey({
      columnNames: ['category_subcategory_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories_subcategories',
      name: 'categories_subcategories_fk'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'categories_subcategories_fk')
    await queryRunner.dropTable('products')
  }
}
