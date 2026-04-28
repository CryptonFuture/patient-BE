import { MigrationInterface, QueryRunner } from "typeorm";

export class Department1777272009872 implements MigrationInterface {
    name = 'Department1777272009872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "departments" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id")
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "departments"`);
    }

}
