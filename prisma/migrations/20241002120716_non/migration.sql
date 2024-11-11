/*
  Warnings:

  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `discountedPrice` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `imageAlt` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `imageSrc` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `originalPrice` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Products` table. All the data in the column will be lost.
  - The `id` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `title` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Products" DROP CONSTRAINT "Products_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "discountedPrice",
DROP COLUMN "imageAlt",
DROP COLUMN "imageSrc",
DROP COLUMN "originalPrice",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discountedprice" DECIMAL(10,2),
ADD COLUMN     "imagealt" VARCHAR(255),
ADD COLUMN     "imagesrc" VARCHAR(255),
ADD COLUMN     "originalprice" DECIMAL(10,2),
ADD COLUMN     "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "colors" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "cartItems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "cartItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
