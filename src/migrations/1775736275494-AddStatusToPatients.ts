import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToPatients1775736275494 implements MigrationInterface {
    name = 'AddStatusToPatients1775736275494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "patients" 
            ADD COLUMN "status" character varying NOT NULL DEFAULT 'Active'`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "status"`);
    }

}
