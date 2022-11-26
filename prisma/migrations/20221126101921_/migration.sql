/*
  Warnings:

  - You are about to drop the `ShortURL` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ShortURL";

-- CreateTable
CREATE TABLE "short_urls" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "short_urls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "short_url_id" INTEGER NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "short_urls_code_key" ON "short_urls"("code");

-- CreateIndex
CREATE UNIQUE INDEX "visits_short_url_id_key" ON "visits"("short_url_id");

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_short_url_id_fkey" FOREIGN KEY ("short_url_id") REFERENCES "short_urls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
