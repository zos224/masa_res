/*
  Warnings:

  - You are about to drop the `AdditionalMenuItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AdditionalMenuItemOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CateringOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CateringOptionInclude` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CateringOptionIncludeProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CateringService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CateringServiceOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FingerfoodOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FingerfoodOrderProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestQuote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestQuoteParty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestQuotePartyAddProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestQuotePartyProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdditionalMenuItemOption" DROP CONSTRAINT "AdditionalMenuItemOption_idAddMenuItem_fkey";

-- DropForeignKey
ALTER TABLE "AdditionalMenuItemOption" DROP CONSTRAINT "AdditionalMenuItemOption_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "CateringOptionInclude" DROP CONSTRAINT "CateringOptionInclude_idCateringOption_fkey";

-- DropForeignKey
ALTER TABLE "CateringOptionIncludeProduct" DROP CONSTRAINT "CateringOptionIncludeProduct_idCateringOptionInclude_fkey";

-- DropForeignKey
ALTER TABLE "CateringOptionIncludeProduct" DROP CONSTRAINT "CateringOptionIncludeProduct_idProduct_fkey";

-- DropForeignKey
ALTER TABLE "CateringServiceOption" DROP CONSTRAINT "CateringServiceOption_idCateringOption_fkey";

-- DropForeignKey
ALTER TABLE "CateringServiceOption" DROP CONSTRAINT "CateringServiceOption_idCateringService_fkey";

-- DropForeignKey
ALTER TABLE "CustomOrder" DROP CONSTRAINT "CustomOrder_idRequestQoute_fkey";

-- DropForeignKey
ALTER TABLE "FingerfoodOrder" DROP CONSTRAINT "FingerfoodOrder_idRequestQoute_fkey";

-- DropForeignKey
ALTER TABLE "FingerfoodOrderProduct" DROP CONSTRAINT "FingerfoodOrderProduct_idCateringOptionIncludeProduct_fkey";

-- DropForeignKey
ALTER TABLE "FingerfoodOrderProduct" DROP CONSTRAINT "FingerfoodOrderProduct_idFingerfoodOrder_fkey";

-- DropForeignKey
ALTER TABLE "RequestQuoteParty" DROP CONSTRAINT "RequestQuoteParty_idCateringOption_fkey";

-- DropForeignKey
ALTER TABLE "RequestQuoteParty" DROP CONSTRAINT "RequestQuoteParty_idRequestQoute_fkey";

-- DropForeignKey
ALTER TABLE "RequestQuotePartyAddProduct" DROP CONSTRAINT "RequestQuotePartyAddProduct_idAdditinalOption_fkey";

-- DropForeignKey
ALTER TABLE "RequestQuotePartyAddProduct" DROP CONSTRAINT "RequestQuotePartyAddProduct_idRequestQuoteParty_fkey";

-- DropForeignKey
ALTER TABLE "RequestQuotePartyProduct" DROP CONSTRAINT "RequestQuotePartyProduct_idCateringOptionIncludeProduct_fkey";

-- DropForeignKey
ALTER TABLE "RequestQuotePartyProduct" DROP CONSTRAINT "RequestQuotePartyProduct_idRequestQuoteParty_fkey";

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "idOrder" DROP NOT NULL;

-- DropTable
DROP TABLE "AdditionalMenuItem";

-- DropTable
DROP TABLE "AdditionalMenuItemOption";

-- DropTable
DROP TABLE "CateringOption";

-- DropTable
DROP TABLE "CateringOptionInclude";

-- DropTable
DROP TABLE "CateringOptionIncludeProduct";

-- DropTable
DROP TABLE "CateringService";

-- DropTable
DROP TABLE "CateringServiceOption";

-- DropTable
DROP TABLE "CustomOrder";

-- DropTable
DROP TABLE "FingerfoodOrder";

-- DropTable
DROP TABLE "FingerfoodOrderProduct";

-- DropTable
DROP TABLE "RequestQuote";

-- DropTable
DROP TABLE "RequestQuoteParty";

-- DropTable
DROP TABLE "RequestQuotePartyAddProduct";

-- DropTable
DROP TABLE "RequestQuotePartyProduct";

-- CreateTable
CREATE TABLE "Catering" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "numberOfPeople" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "occasion" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "additionalComments" TEXT NOT NULL,

    CONSTRAINT "Catering_pkey" PRIMARY KEY ("id")
);
