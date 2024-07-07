import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class UpdateEntitiesAndRelationships1625000000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Helper function to add column if it doesn't exist
    const addColumnIfNotExists = async (table: string, column: TableColumn) => {
      try {
        await queryRunner.addColumn(table, column);
      } catch (error) {
        // Column likely already exists, so we'll skip it
        console.log(`Column ${column.name} might already exist in ${table}.`);
      }
    };

    // Helper function to create index if it doesn't exist
    const createIndexIfNotExists = async (table: string, index: TableIndex) => {
      try {
        await queryRunner.createIndex(table, index);
      } catch (error) {
        // Index likely already exists, so we'll skip it
        console.log(`Index ${index.name} might already exist in ${table}.`);
      }
    };

    // Update User table
    await addColumnIfNotExists(
      'user',
      new TableColumn({ name: 'hasImage', type: 'boolean', default: false }),
    );
    await addColumnIfNotExists(
      'user',
      new TableColumn({ name: 'imageUrl', type: 'varchar', isNullable: true }),
    );
    await addColumnIfNotExists(
      'user',
      new TableColumn({
        name: 'passwordEnabled',
        type: 'boolean',
        default: false,
      }),
    );
    await addColumnIfNotExists(
      'user',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
    await addColumnIfNotExists(
      'user',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      }),
    );
    await addColumnIfNotExists(
      'user',
      new TableColumn({ name: 'isDeleted', type: 'boolean', default: false }),
    );

    // Make email fields nullable except email1
    await queryRunner.changeColumn(
      'user',
      'email2',
      new TableColumn({ name: 'email2', type: 'varchar', isNullable: true }),
    );
    await queryRunner.changeColumn(
      'user',
      'email3',
      new TableColumn({ name: 'email3', type: 'varchar', isNullable: true }),
    );

    // Add index on email1 and username
    await createIndexIfNotExists(
      'user',
      new TableIndex({
        name: 'IDX_USER_EMAIL1',
        columnNames: ['email1'],
      }),
    );

    await createIndexIfNotExists(
      'user',
      new TableIndex({
        name: 'IDX_USER_USERNAME',
        columnNames: ['username'],
      }),
    );

    // Update Role table
    await addColumnIfNotExists(
      'role',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
    await addColumnIfNotExists(
      'role',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      }),
    );

    // Make role name unique
    await createIndexIfNotExists(
      'role',
      new TableIndex({
        name: 'UQ_ROLE_NAME',
        columnNames: ['name'],
        isUnique: true,
      }),
    );

    // Update Permission table
    await addColumnIfNotExists(
      'permission',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await addColumnIfNotExists(
      'permission',
      new TableColumn({ name: 'resource', type: 'varchar', isNullable: true }),
    );
    await addColumnIfNotExists(
      'permission',
      new TableColumn({ name: 'action', type: 'varchar', isNullable: true }),
    );
    await addColumnIfNotExists(
      'permission',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
    await addColumnIfNotExists(
      'permission',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
      }),
    );

    // Make permission name unique
    await createIndexIfNotExists(
      'permission',
      new TableIndex({
        name: 'UQ_PERMISSION_NAME',
        columnNames: ['name'],
        isUnique: true,
      }),
    );

    // Create UserRole junction table if it doesn't exist
    try {
      await queryRunner.createTable(
        new Table({
          name: 'user_role',
          columns: [
            { name: 'userId', type: 'uuid' },
            { name: 'roleId', type: 'uuid' },
          ],
          foreignKeys: [
            {
              columnNames: ['userId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
            },
            {
              columnNames: ['roleId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'role',
              onDelete: 'CASCADE',
            },
          ],
        }),
        true,
      );
    } catch (error) {
      console.log('UserRole table might already exist.');
    }

    // Create RolePermission junction table if it doesn't exist
    try {
      await queryRunner.createTable(
        new Table({
          name: 'role_permission',
          columns: [
            { name: 'roleId', type: 'uuid' },
            { name: 'permissionId', type: 'uuid' },
          ],
          foreignKeys: [
            {
              columnNames: ['roleId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'role',
              onDelete: 'CASCADE',
            },
            {
              columnNames: ['permissionId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'permission',
              onDelete: 'CASCADE',
            },
          ],
        }),
        true,
      );
    } catch (error) {
      console.log('RolePermission table might already exist.');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert RolePermission junction table
    await queryRunner.dropTable('role_permission');

    // Revert UserRole junction table
    await queryRunner.dropTable('user_role');

    // Revert Permission table changes
    await queryRunner.dropColumn('permission', 'description');
    await queryRunner.dropColumn('permission', 'resource');
    await queryRunner.dropColumn('permission', 'action');
    await queryRunner.dropColumn('permission', 'createdAt');
    await queryRunner.dropColumn('permission', 'updatedAt');
    await queryRunner.dropIndex('permission', 'UQ_PERMISSION_NAME');

    // Revert Role table changes
    await queryRunner.dropColumn('role', 'createdAt');
    await queryRunner.dropColumn('role', 'updatedAt');
    await queryRunner.dropIndex('role', 'UQ_ROLE_NAME');

    // Revert User table changes
    await queryRunner.dropColumn('user', 'hasImage');
    await queryRunner.dropColumn('user', 'imageUrl');
    await queryRunner.dropColumn('user', 'passwordEnabled');
    await queryRunner.dropColumn('user', 'createdAt');
    await queryRunner.dropColumn('user', 'updatedAt');
    await queryRunner.dropColumn('user', 'isDeleted');
    await queryRunner.changeColumn(
      'user',
      'email2',
      new TableColumn({ name: 'email2', type: 'varchar' }),
    );
    await queryRunner.changeColumn(
      'user',
      'email3',
      new TableColumn({ name: 'email3', type: 'varchar' }),
    );
    await queryRunner.dropIndex('user', 'IDX_USER_EMAIL1');
    await queryRunner.dropIndex('user', 'IDX_USER_USERNAME');
  }
}
