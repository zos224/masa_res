/*
  Warnings:

  - You are about to drop the column `idSubType` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_idSubType_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "idSubType";

-- CreateTable
CREATE TABLE "SubTypeProduct" (
    "id" SERIAL NOT NULL,
    "idSubType" INTEGER NOT NULL,
    "idProduct" INTEGER NOT NULL,

    CONSTRAINT "SubTypeProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubTypeProduct" ADD CONSTRAINT "SubTypeProduct_idSubType_fkey" FOREIGN KEY ("idSubType") REFERENCES "SubType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTypeProduct" ADD CONSTRAINT "SubTypeProduct_idProduct_fkey" FOREIGN KEY ("idProduct") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
