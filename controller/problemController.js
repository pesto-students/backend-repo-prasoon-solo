import { prisma } from '../database/db.js';

const addProblem = async (req, res, next) => {
  try {
    const { problem } = req.body;
    console.log('req.body', req.body);
    // console.log('req.body addProblem=>', req.body);
    await prisma.$connect();
    const createdProblem = await prisma.problem.create({
      data: problem,
    });
    req.body.problemId = createdProblem.id;
    await prisma.$disconnect();
    next();
  } catch (error) {
    console.log('error addProblem====>', error);
    next(error);
  }
};

const allProblems = async (req, res, next) => {
  try {
    await prisma.$connect();
    const result = await prisma.problem.findMany();
    res.json(result);
    await prisma.$disconnect();
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};

const getSingleProblem = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const numId = Number(id);
      await prisma.$connect();
      const problem = await prisma.problem.findUnique({ where: { id: numId } });
      console.log('problem', problem);
      await prisma.$disconnect();
      res.json(problem);
    }
  } catch (error) {
    console.log('error=======>', error);
    next(error);
  }
};

const addProblemConstraints = async (req, res, next) => {
  try {
    const { constraints, problemId } = req.body;
    // constraintOne constraintOne
    const modProblemConstraint = { ...constraints, problemId };
    const createdConstraints = await prisma.problemConstraint.create({
      data: modProblemConstraint,
    });
    const updatedProblem = await prisma.problem.update({
      where: { id: problemId },
      data: { constraintId: createdConstraints.id },
    });
    console.log('createdConstraints', createdConstraints);
    console.log('updatedProblem', updatedProblem);
    next();
  } catch (error) {
    console.log('error addProblemConstraint====>', error);
    next(error);
  }
};

const addProblemParaStatements = async (req, res, next) => {
  try {
    const { paraStatements, problemId } = req.body;
    const modProblemParaStatement = { ...paraStatements, problemId };
    const createdProblemParaStatement =
      await prisma.problemParaStatement.create({
        data: modProblemParaStatement,
      });
    const updatedProblem = await prisma.problem.update({
      where: { id: problemId },
      data: { paraStatementId: createdProblemParaStatement.id },
    });
    console.log('createdProblemParaStatement', createdProblemParaStatement);
    console.log('updatedProblem', updatedProblem);
    next();
  } catch (error) {
    console.log('error addProblemConstraint====>', error);
    next(error);
  }
};

const addExamples = async (req, res, next) => {
  try {
    const { examples, problemId } = req.body;
    const modExamples = examples.map((example) => ({
      ...example,
      problemId,
    }));
    const createdExamples = await prisma.examples.createManyAndReturn({
      data: modExamples,
    });
    console.log('createdExamples', createdExamples);
    const examplesIds = createdExamples.map((example) => example.id);
    console.log('examplesIds', examplesIds);
    const updatedProblem = await prisma.problem.update({
      where: { id: problemId },
      data: { examplesIds: examplesIds },
    });
    console.log('createdExamples', createdExamples);
    console.log('updatedProblem', updatedProblem);
    next();
  } catch (error) {
    console.log('error addexamples====>', error);
    next(error);
  }
};

const getSingleProblemConstraint = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const numId = Number(id);
      await prisma.$connect();
      const constraint = await prisma.problemConstraint.findUnique({
        where: { id: numId },
      });
      console.log('constraint', constraint);
      await prisma.$disconnect();
      res.json(constraint);
    }
  } catch (error) {
    console.log('error=======>', error);
    next(error);
  }
};

const getSingleProblemParaStatement = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const numId = Number(id);
      await prisma.$connect();
      const paraStatement = await prisma.problemParaStatement.findUnique({
        where: { id: numId },
      });
      console.log('paraStatement', paraStatement);
      await prisma.$disconnect();
      res.json(paraStatement);
    }
  } catch (error) {
    console.log('error=======>', error);
    next(error);
  }
};

const getSingleProblemExamples = async (req, res, next) => {
  try {
    const { examplesIds } = req.body;
    console.log('examplesIds', examplesIds);
    if (examplesIds) {
      await prisma.$connect();
      const examples = await prisma.examples.findMany({
        where: { id: { in: examplesIds } },
      });
      console.log('examples', examples);
      await prisma.$disconnect();
      res.json(examples);
    }
  } catch (error) {
    console.log('error=======>', error);
    next(error);
  }
};

export {
  addProblem,
  allProblems,
  getSingleProblem,
  addExamples,
  addProblemConstraints,
  addProblemParaStatements,
  getSingleProblemExamples,
  getSingleProblemConstraint,
  getSingleProblemParaStatement,
};
