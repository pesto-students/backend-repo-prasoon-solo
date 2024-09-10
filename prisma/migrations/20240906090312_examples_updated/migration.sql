/*
  Warnings:

  - Added the required column `case` to the `Examples` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TestCaseNum" AS ENUM ('CASE1', 'CASE2', 'CASE3');

-- AlterTable
ALTER TABLE "Examples" ADD COLUMN     "case" "TestCaseNum" NOT NULL;
