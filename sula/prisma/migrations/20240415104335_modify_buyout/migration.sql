/*
  Warnings:

  - Added the required column `time` to the `BuyOut` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuyOut" ADD COLUMN     "time" TEXT NOT NULL;
