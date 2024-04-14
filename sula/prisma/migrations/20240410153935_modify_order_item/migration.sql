/*
  Warnings:

  - You are about to drop the column `quantity` on the `OrderItemCustomization` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `OrderItemOption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItemCustomization" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "OrderItemOption" DROP COLUMN "quantity";
