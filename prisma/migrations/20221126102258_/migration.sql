/*
  Warnings:

  - Added the required column `count` to the `visits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visits" ADD COLUMN     "count" INTEGER NOT NULL;
