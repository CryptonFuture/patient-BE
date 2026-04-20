import { MigrationInterface, QueryRunner } from "typeorm";

export class Contact1776236564735 implements MigrationInterface {
    name = 'Contact1776236564735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "contacts" (
                "id" SERIAL NOT NULL, 
                "phone" character varying NOT NULL, 
                "alternatePhone" character varying NOT NULL, 
                "city" character varying NOT NULL, 
                "country" character varying NOT NULL, 
                "email" character varying NOT NULL, 
                "address" character varying NOT NULL, 
                "patientId" integer,
                "status" boolean NOT NULL DEFAULT true, 
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), 
                CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"),
                CONSTRAINT "FK_contacts_patient"
                FOREIGN KEY ("patientId")
                REFERENCES "patients"("id")
                ON DELETE CASCADE
            )`
        );
        
        await queryRunner.query(`
            CREATE TABLE "medicals" (
                "id" SERIAL NOT NULL, 
                "bloodGroup" character varying NOT NULL, 
                "height" character varying NOT NULL, 
                "weight" character varying NOT NULL, 
                "allergies" character varying NOT NULL, 
                "diseases" character varying NOT NULL, 
                "medications" character varying NOT NULL, 
                "patientId" integer,
                "status" boolean NOT NULL DEFAULT true,  
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "PK_f70c91e60c613cd7e1a3c98b3da" PRIMARY KEY ("id"),
                CONSTRAINT "FK_contacts_patient"
                FOREIGN KEY ("patientId")
                REFERENCES "patients"("id")
                ON DELETE CASCADE
            )`
        );

        await queryRunner.query(`
            CREATE TABLE "register" (
                "id" SERIAL NOT NULL, 
                "patientType" character varying NOT NULL, 
                "department" character varying NOT NULL, 
                "assignedDoctor" character varying NOT NULL, 
                "registerDate" character varying NOT NULL, 
                "patientId" integer,
                "status" boolean NOT NULL DEFAULT true, 
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "PK_14473cc8f2caa81fd19f7648d54" PRIMARY KEY ("id"),
                CONSTRAINT "FK_contacts_patient"
                FOREIGN KEY ("patientId")
                REFERENCES "patients"("id")
                ON DELETE CASCADE
            )`
        );

        await queryRunner.query(`
            CREATE TABLE "emergency" (
                "id" SERIAL NOT NULL, 
                "emergencyName" character varying NOT NULL, 
                "emergencyNumber" character varying NOT NULL, 
                "insuranceProvider" character varying NOT NULL, 
                "occupation" character varying NOT NULL, 
                "maritalStatus" character varying NOT NULL, 
                "patientId" integer,
                "status" boolean NOT NULL DEFAULT true,  
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "PK_577f3349535b2d39704154478d1" PRIMARY KEY ("id"),
                CONSTRAINT "FK_contacts_patient"
                FOREIGN KEY ("patientId")
                REFERENCES "patients"("id")
                ON DELETE CASCADE
            )`
        );
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "maritalStatus"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP CONSTRAINT "UQ_64e2031265399f5690b0beba6a5"`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patients" ADD CONSTRAINT "UQ_64e2031265399f5690b0beba6a5" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "maritalStatus" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "emergency"`);
        await queryRunner.query(`DROP TABLE "register"`);
        await queryRunner.query(`DROP TABLE "medicals"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
