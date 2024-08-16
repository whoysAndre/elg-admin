/*
  Warnings:

  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('shirts', 'pants', 'hats', 'sneakers', 'sandals', 'hoodies', 'caps', 'sets');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "Type" NOT NULL;
