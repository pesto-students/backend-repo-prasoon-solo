/*
  Warnings:

  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropTable
DROP TABLE "Employee";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "difficulty" "DifficultyLevel" NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "videoId" TEXT,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);
