import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1775713016574 implements MigrationInterface {
    name = 'Init1775713016574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users"(
              "id" SERIAL PRIMARY KEY,
              "name" character varying NOT NULL,
              "email" character varying NOT NULL UNIQUE,
              "age" integer NULL,
              "createdAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
