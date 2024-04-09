/*
  Warnings:

  - Added the required column `image` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "image" TEXT NOT NULL;
