/*
  Warnings:

  - You are about to drop the `AccountOffer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BlogTopic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoyalCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Offer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountOffer" DROP CONSTRAINT "AccountOffer_idAccount_fkey";

-- DropForeignKey
ALTER TABLE "AccountOffer" DROP CONSTRAINT "AccountOffer_idOffer_fkey";

-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_idBlogTopic_fkey";

-- DropForeignKey
ALTER TABLE "LoyalCard" DROP CONSTRAINT "LoyalCard_idCustomerAccount_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_idProduct_fkey";

-- AlterTable
ALTER TABLE "CustomerAccount" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "AccountOffer";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "BlogTopic";

-- DropTable
DROP TABLE "LoyalCard";

-- DropTable
DROP TABLE "Offer";
