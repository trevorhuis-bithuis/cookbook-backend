/*
  Warnings:

  - You are about to alter the column `id` on the `Recipe` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `id` on the `Ingredient` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - You are about to alter the column `recipeId` on the `Ingredient` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Recipe" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" STRING(255) NOT NULL,
    "category" "Category" NOT NULL,
    "favorite" BOOL NOT NULL DEFAULT false,
    "desciption" STRING,
    "steps" STRING[],
    "authorId" STRING NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Recipe" ("authorId","category","createdAt","desciption","favorite","id","steps","title","updatedAt") SELECT "authorId","category","createdAt","desciption","favorite","id","steps","title","updatedAt" FROM "Recipe";
DROP TABLE "Recipe" CASCADE;
ALTER TABLE "_prisma_new_Recipe" RENAME TO "Recipe";
CREATE UNIQUE INDEX "Recipe_id_key" ON "Recipe"("id");
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE TABLE "_prisma_new_Ingredient" (
    "id" STRING NOT NULL,
    "name" STRING(255) NOT NULL,
    "unit" STRING(255) NOT NULL,
    "quantity" INT4 NOT NULL,
    "recipeId" STRING NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Ingredient" ("id","name","quantity","recipeId","unit") SELECT "id","name","quantity","recipeId","unit" FROM "Ingredient";
DROP TABLE "Ingredient" CASCADE;
ALTER TABLE "_prisma_new_Ingredient" RENAME TO "Ingredient";
CREATE UNIQUE INDEX "Ingredient_id_key" ON "Ingredient"("id");
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
