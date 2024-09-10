/*
  Warnings:

  - A unique constraint covering the columns `[constraintId]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paraStatementId]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "constraintId" INTEGER,
ADD COLUMN     "examplesIds" INTEGER[],
ADD COLUMN     "paraStatementId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Problem_constraintId_key" ON "Problem"("constraintId");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_paraStatementId_key" ON "Problem"("paraStatementId");
