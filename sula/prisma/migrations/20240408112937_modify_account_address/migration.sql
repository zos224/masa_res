/*
  Warnings:

  - Added the required column `address` to the `CustomerAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerAccount" ADD COLUMN     "address" TEXT NOT NULL;
