import { MigrationInterface, QueryRunner } from "typeorm";

export class default1669583923384 implements MigrationInterface {
    name = 'default1669583923384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "visit" ALTER COLUMN "count" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "visit" ALTER COLUMN "count" DROP DEFAULT`);
    }

}
