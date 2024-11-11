/*
  Warnings:

  - You are about to drop the column `currentPrice` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `discountPrice` on the `Products` table. All the data in the column will be lost.
  - Added the required column `colors` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountedPrice` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "currentPrice",
DROP COLUMN "discountPrice",
ADD COLUMN     "colors" JSONB NOT NULL,
ADD COLUMN     "discountedPrice" TEXT NOT NULL,
ADD COLUMN     "originalPrice" TEXT NOT NULL;
