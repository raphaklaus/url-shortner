import { MigrationInterface, QueryRunner } from "typeorm";

export class init1669574629114 implements MigrationInterface {
    name = 'init1669574629114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "visit" ("id" SERIAL NOT NULL, "count" integer NOT NULL, "shortURLId" integer, CONSTRAINT "REL_d8a36ffd14d130b5880e4db3c8" UNIQUE ("shortURLId"), CONSTRAINT "PK_c9919ef5a07627657c535d8eb88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "short_url" ("id" SERIAL NOT NULL, "source" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_532f7838fa64d3e0cdc3cd66729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_79ebd169d3f4bbe9b88d2e689b" ON "short_url" ("source") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_39c32cd2f505b21a0687859669" ON "short_url" ("code") `);
        await queryRunner.query(`ALTER TABLE "visit" ADD CONSTRAINT "FK_d8a36ffd14d130b5880e4db3c82" FOREIGN KEY ("shortURLId") REFERENCES "short_url"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "visit" DROP CONSTRAINT "FK_d8a36ffd14d130b5880e4db3c82"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39c32cd2f505b21a0687859669"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_79ebd169d3f4bbe9b88d2e689b"`);
        await queryRunner.query(`DROP TABLE "short_url"`);
        await queryRunner.query(`DROP TABLE "visit"`);
    }

}
