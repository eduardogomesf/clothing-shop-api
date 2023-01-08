import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createCustomerAddressTable1673190186054 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer_addresses',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'street',
            type: 'varchar'
          },
          {
            name: 'number',
            type: 'int'
          },
          {
            name: 'neighborhood',
            type: 'varchar'
          },
          {
            name: 'city',
            type: 'varchar'
          },
          {
            name: 'state',
            type: 'varchar'
          },
          {
            name: 'country',
            type: 'varchar',
            default: '\'Brazil\''
          },
          {
            name: 'postal_code',
            type: 'varchar'
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'is_main',
            type: 'boolean',
            default: '\'false\''
          },
          {
            name: 'customer_id',
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

    await queryRunner.createForeignKey('customer_addresses', new TableForeignKey({
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      name: 'customer_addresses_fk'
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('customer_addresses', 'customer_addresses_fk')

    await queryRunner.dropTable('customer_addresses')
  }
}
