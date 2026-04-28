import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLocationTables1777361796780 implements MigrationInterface {
    name = 'CreateLocationTables1777361796780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "countries" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "code" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b47cbb5311bad9c9ae17b8c1eda" UNIQUE ("code"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id")
            )`
        );

        await queryRunner.query(`
            CREATE TABLE "states" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "country_id" integer, CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id")
            )`
        );

        await queryRunner.query(`
            CREATE TABLE "cities" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "state_id" integer, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id")
            )`
        );

        await queryRunner.query(`
            CREATE TABLE "zipcodes" (
            "id" SERIAL NOT NULL, 
            "code" character varying NOT NULL, 
            "status" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "city_id" integer, CONSTRAINT "PK_999b9a578d85112c67607c787cb" PRIMARY KEY ("id")
            )`
        );
        
        await queryRunner.query(`ALTER TABLE "states" ADD CONSTRAINT "FK_f3bbd0bc19bb6d8a887add08461" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_1229b56aa12cae674b824fccd13" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "zipcodes" ADD CONSTRAINT "FK_6bf0df65b9e6dc86a6ff04d07bd" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zipcodes" DROP CONSTRAINT "FK_6bf0df65b9e6dc86a6ff04d07bd"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_1229b56aa12cae674b824fccd13"`);
        await queryRunner.query(`ALTER TABLE "states" DROP CONSTRAINT "FK_f3bbd0bc19bb6d8a887add08461"`);
      
        await queryRunner.query(`DROP TABLE "zipcodes"`);
        await queryRunner.query(`DROP TABLE "cities"`);
        await queryRunner.query(`DROP TABLE "states"`);
        await queryRunner.query(`DROP TABLE "countries"`);

    }

}
