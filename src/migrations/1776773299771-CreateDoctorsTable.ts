import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDoctorsTable1776773299771 implements MigrationInterface {
    name = 'CreateDoctorsTable1776773299771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "schedules" (
            "id" SERIAL NOT NULL, 
            "availableDays" text[] NOT NULL, 
            "availableTimeStart" TIME NOT NULL, 
            "availableTimeEnd" TIME NOT NULL, 
            "consultationDuration" integer NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "doctorId" integer, CONSTRAINT "REL_fb7ad28e0dd40050c93fec0b7c" UNIQUE ("doctorId"), CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id")
            )`
        );

        await queryRunner.query(
            `CREATE TABLE "systems" (
            "id" SERIAL NOT NULL, 
            "joiningDate" character varying NOT NULL, 
            "profileImage" character varying NULL, 
            "remarks" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "doctorId" integer, CONSTRAINT "REL_df2c328f4797a9e4d183cc635f" UNIQUE ("doctorId"), CONSTRAINT "PK_aec3139aedeb09c5ae27f2c94d3" PRIMARY KEY ("id")
            )`
        );

        await queryRunner.query(
            `CREATE TABLE "doctors" (
            "id" SERIAL NOT NULL, 
            "firstname" character varying NOT NULL, 
            "lastname" character varying NOT NULL, 
            "gender" character varying NOT NULL, 
            "dateOfBirth" date NOT NULL, 
            "address" character varying NOT NULL, 
            "phone" character varying NOT NULL, 
            "email" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_88e33c8ebf0cce499b9d5d25c60" UNIQUE ("phone"), CONSTRAINT "UQ_62069f52ebba471c91de5d59d61" UNIQUE ("email"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id")
            )`
        );
        
        await queryRunner.query(
            `CREATE TABLE "professionals" (
            "id" SERIAL NOT NULL, 
            "specialization" character varying NOT NULL, 
            "department" character varying NOT NULL, 
            "qualification" character varying NOT NULL, 
            "experience" character varying NOT NULL, 
            "licenseNumber" integer NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "doctorId" integer, CONSTRAINT "REL_35fca1649498e6442002fad6d7" UNIQUE ("doctorId"), CONSTRAINT "PK_d7dc8473b49fcd938def2799387" PRIMARY KEY ("id")
            )`
        );
        
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_fb7ad28e0dd40050c93fec0b7ca" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "systems" ADD CONSTRAINT "FK_df2c328f4797a9e4d183cc635f2" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professionals" ADD CONSTRAINT "FK_35fca1649498e6442002fad6d7a" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professionals" DROP CONSTRAINT "FK_35fca1649498e6442002fad6d7a"`);
        await queryRunner.query(`ALTER TABLE "systems" DROP CONSTRAINT "FK_df2c328f4797a9e4d183cc635f2"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_fb7ad28e0dd40050c93fec0b7ca"`);

        await queryRunner.query(`DROP TABLE "professionals"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "systems"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
    }

}
