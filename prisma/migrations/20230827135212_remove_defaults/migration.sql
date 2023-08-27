/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "isPublished",
ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "authorsScore" DROP DEFAULT,
ALTER COLUMN "categoryId" DROP DEFAULT,
ALTER COLUMN "text" DROP DEFAULT;
