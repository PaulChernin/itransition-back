/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" SMALLINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "categoryId";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
