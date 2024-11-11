/*
  Warnings:

  - Changed the type of `discountedPrice` on the `Products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `originalPrice` on the `Products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "discountedPrice",
ADD COLUMN     "discountedPrice" DECIMAL(65,30) NOT NULL,
DROP COLUMN "originalPrice",
ADD COLUMN     "originalPrice" DECIMAL(65,30) NOT NULL;
