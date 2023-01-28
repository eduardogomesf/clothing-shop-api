import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createCategoriesSubcategoriesTable1674173891388 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories_subcategories',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'category_id',
            type: 'varchar'
          },
          {
            name: 'subcategory_id',
            type: 'varchar'
          }
        ],
        foreignKeys: [
          {
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories'
          },
          {
            columnNames: ['subcategory_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'subcategories'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories_subcategories')
  }
}
