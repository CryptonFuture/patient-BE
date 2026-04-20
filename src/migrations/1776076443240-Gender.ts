import { MigrationInterface, QueryRunner } from "typeorm";

export class Gender1776076443240 implements MigrationInterface {
    name = 'Gender1776076443240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genders" (
            "id" SERIAL NOT NULL, 
            "gender" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_529fb131dd4164c94529f53e19d" 
            PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "genders"`);
    }

}
