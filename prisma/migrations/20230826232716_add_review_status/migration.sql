/*
  Warnings:

  - Added the required column `isPublished` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "isPublished" BOOLEAN NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;
