/*
  Warnings:

  - Changed the type of `brands` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('nike', 'adidas', 'puma', 'reebok');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brands",
ADD COLUMN     "brands" "Brand" NOT NULL;
