import { Router } from 'express';
import { validatorMiddleware } from '../middlewares/validator.js';
import { problemSchema } from '../validators/problemValidators.js';
import { addProblem } from '../controller/problemController.js';

const router = Router();

router.post('/addProblem', validatorMiddleware(problemSchema),addProblem)

export default router;