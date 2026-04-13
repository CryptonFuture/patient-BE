import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePatientsTable1775722768910 implements MigrationInterface {
    name = 'CreatePatientsTable1775722768910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "patients" (
                "id" SERIAL NOT NULL, 
                "firstname" character varying NOT NULL, 
                "lastname" character varying NOT NULL, 
                "gender" character varying NOT NULL, 
                "maritalStatus" character varying NOT NULL, 
                "address" character varying NOT NULL, 
                "dateOfBirth" date NOT NULL, 
                "cnic" character varying NOT NULL, 
                "phone" character varying NOT NULL, 
                "email" character varying NOT NULL, 
                "age" integer,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_e85d7621a5f92d115a77fa2b5e9" 
                UNIQUE ("cnic"), CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" 
                UNIQUE ("email"), CONSTRAINT "PK_a7f0b9fcbb3469d5ec0b0aceaa7" 
                PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "patients"`);
    }

}
