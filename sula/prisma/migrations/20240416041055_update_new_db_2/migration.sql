/*
  Warnings:

  - You are about to drop the column `price` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `seatingOption` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the `BuyOut` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupReversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TableReversation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BuyOut" DROP CONSTRAINT "BuyOut_idReservation_fkey";

-- DropForeignKey
ALTER TABLE "GroupReversation" DROP CONSTRAINT "GroupReversation_idReservation_fkey";

-- DropForeignKey
ALTER TABLE "TableReversation" DROP CONSTRAINT "TableReversation_idReservation_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "price",
DROP COLUMN "slug",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "amount";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "specialRequest" TEXT,
ALTER COLUMN "numberOfGuests" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "seatingOption";

-- DropTable
DROP TABLE "BuyOut";

-- DropTable
DROP TABLE "GroupReversation";

-- DropTable
DROP TABLE "TableReversation";
