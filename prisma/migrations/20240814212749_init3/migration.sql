/*
  Warnings:

  - Changed the type of `gender` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL;
