import { MigrationInterface, QueryRunner } from "typeorm";

export class BloodGroup1777878567011 implements MigrationInterface {
    name = 'BloodGroup1777878567011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bloodgroup" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_818748bc7273c962feb83987295" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bloodgroup"`);
    }

}
