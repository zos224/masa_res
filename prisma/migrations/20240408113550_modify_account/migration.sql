/*
  Warnings:

  - You are about to drop the column `numberOfReferrals` on the `CustomerAccount` table. All the data in the column will be lost.
  - You are about to drop the column `referralCode` on the `CustomerAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerAccount" DROP COLUMN "numberOfReferrals",
DROP COLUMN "referralCode";
