/*
  Warnings:

  - Added the required column `imageAlt` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSrc` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "imageAlt" TEXT NOT NULL,
ADD COLUMN     "imageSrc" TEXT NOT NULL;
