import { MigrationInterface, QueryRunner } from 'typeorm';

export class StripPlusFromPhoneNumbers1747440000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "subscribers"
      SET phone_number = LTRIM(phone_number, '+')
      WHERE phone_number LIKE '+%'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No rollback — original + prefixes are not stored
  }
}
