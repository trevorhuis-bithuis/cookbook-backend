/*
  Warnings:

  - You are about to drop the column `desciption` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "desciption";
ALTER TABLE "Recipe" ADD COLUMN     "description" STRING;
