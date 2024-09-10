-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Examples" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT,
    "inputText" TEXT NOT NULL,
    "outputText" TEXT NOT NULL,
    "explanation" TEXT,
    "problemId" INTEGER NOT NULL,

    CONSTRAINT "Examples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemParaStatement" (
    "id" SERIAL NOT NULL,
    "paraOne" TEXT NOT NULL,
    "paraTwo" TEXT,
    "paraThree" TEXT,
    "paraFour" TEXT,
    "paraFive" TEXT,
    "problemId" INTEGER NOT NULL,

    CONSTRAINT "ProblemParaStatement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemConstraint" (
    "id" SERIAL NOT NULL,
    "problemId" INTEGER NOT NULL,
    "constraintOne" TEXT NOT NULL,
    "constraintTwo" TEXT,
    "constraintThree" TEXT,
    "constraintFour" TEXT,
    "constraintFive" TEXT,

    CONSTRAINT "ProblemConstraint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProblemParaStatement_problemId_key" ON "ProblemParaStatement"("problemId");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemConstraint_problemId_key" ON "ProblemConstraint"("problemId");

-- AddForeignKey
ALTER TABLE "Examples" ADD CONSTRAINT "Examples_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemParaStatement" ADD CONSTRAINT "ProblemParaStatement_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemConstraint" ADD CONSTRAINT "ProblemConstraint_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
