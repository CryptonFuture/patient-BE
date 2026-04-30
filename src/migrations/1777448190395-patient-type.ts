import { MigrationInterface, QueryRunner } from "typeorm";

export class PatientType1777448190395 implements MigrationInterface {
    name = 'PatientType1777448190395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "type" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "type"`);
    }

}
