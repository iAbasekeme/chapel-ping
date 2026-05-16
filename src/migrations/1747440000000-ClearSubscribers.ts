import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClearSubscribers1747440000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "subscribers" RESTART IDENTITY CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No rollback — data cannot be restored
  }
}
