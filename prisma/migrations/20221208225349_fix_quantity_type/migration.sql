/*
  Warnings:

  - Changed the type of `quantity` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "quantity";
ALTER TABLE "Ingredient" ADD COLUMN     "quantity" FLOAT8 NOT NULL;
