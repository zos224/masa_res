/*
  Warnings:

  - You are about to drop the column `idRestaurant` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_idRestaurant_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "idRestaurant";
