import { Router } from 'express';
import { validatorMiddleware } from '../middlewares/validator.js';
import { problemSchema } from '../validators/problemValidators.js';
import { addProblem, allProblems } from '../controller/problemController.js';
import { verifyAccessToken } from '../middlewares/auth.js';

const router = Router();

router.post(
  '/addProblem',
  verifyAccessToken,
  validatorMiddleware(problemSchema),
  addProblem
);
router.get('/allProblems', verifyAccessToken, allProblems);

export default router;
