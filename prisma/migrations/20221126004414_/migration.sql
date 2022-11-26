-- CreateTable
CREATE TABLE "ShortURL" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "source" TEXT NOT NULL,

    CONSTRAINT "ShortURL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortURL_code_key" ON "ShortURL"("code");
