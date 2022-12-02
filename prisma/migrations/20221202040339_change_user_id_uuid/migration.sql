/*
  Warnings:

  - You are about to alter the column `id` on the `User` table. The data in that column will be cast from `BigInt` to `String`. This cast may fail. Please make sure the data in the column can be cast.
  - Changed the type of `userId` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `authorId` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `RefreshToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_authorId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId";
ALTER TABLE "Profile" ADD COLUMN     "userId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "authorId";
ALTER TABLE "Recipe" ADD COLUMN     "authorId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "userId";
ALTER TABLE "RefreshToken" ADD COLUMN     "userId" STRING NOT NULL;

-- RedefineTables
CREATE TABLE "_prisma_new_User" (
    "id" STRING NOT NULL,
    "username" STRING NOT NULL,
    "password" STRING NOT NULL,
    "name" STRING,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
DROP INDEX "User_username_key";
INSERT INTO "_prisma_new_User" ("id","name","password","username") SELECT "id","name","password","username" FROM "User";
DROP TABLE "User" CASCADE;
ALTER TABLE "_prisma_new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
