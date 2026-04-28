import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedLocationData1777362145540 implements MigrationInterface {
    name = 'SeedLocationData1777362145540'

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
            INSERT INTO countries (name, code)
            VALUES ('Pakistan', 'PK')
        `)

         await queryRunner.query(`
            INSERT INTO states (name, country_id)
            VALUES ('Sindh', 1), ('Punjab', 1)
        `)

         await queryRunner.query(`
            INSERT INTO cities (name, state_id)
             VALUES 
                ('Karachi', 1),
                ('Hyderabad', 1),
                ('Lahore', 2);
        `)

         await queryRunner.query(`
            INSERT INTO zipcodes (code, city_id)
             VALUES 
                ('74000', 1),
                ('71000', 2),
                ('54000', 3);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM zipcodes`);
        await queryRunner.query(`DELETE FROM cities`);
        await queryRunner.query(`DELETE FROM states`);
        await queryRunner.query(`DELETE FROM countries`);
    }

}
