import { prisma } from '../database/db.js';

const addProblem = async (req, res, next) => {
  try {
    const { title, category, order, videoId, difficulty } = req.body;
    await prisma.$connect();
    const result = await prisma.problem.create({
      data: {
        title,
        category,
        order,
        videoId,
        difficulty,
      },
    });
    await prisma.$disconnect();
    res.json(result);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export { addProblem };
