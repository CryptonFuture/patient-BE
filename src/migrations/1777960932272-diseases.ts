import { MigrationInterface, QueryRunner } from "typeorm";

export class Diseases1777960932272 implements MigrationInterface {
    name = 'Diseases1777960932272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "diseases" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_79ddc936b1458d8a079b62dc210" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "diseases"`);
    }

}
