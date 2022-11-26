-- DropForeignKey
ALTER TABLE "visits" DROP CONSTRAINT "visits_short_url_id_fkey";

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_short_url_id_fkey" FOREIGN KEY ("short_url_id") REFERENCES "short_urls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
