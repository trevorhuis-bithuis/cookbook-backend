/*
  Warnings:

  - Changed the type of `category` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack');

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "category";
ALTER TABLE "Recipe" ADD COLUMN     "category" "Category" NOT NULL;
