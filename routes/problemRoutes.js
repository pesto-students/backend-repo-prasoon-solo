import { Router } from 'express';
import { validatorMiddleware } from '../middlewares/validator.js';
import { problemSchema } from '../validators/problemValidators.js';
import { addExamples, addProblem, addProblemParaStatements,addProblemConstraints, allProblems , getSingleProblem, getSingleProblemExamples, getSingleProblemConstraint, getSingleProblemParaStatement} from '../controller/problemController.js';
import { verifyAccessToken } from '../middlewares/auth.js';

const router = Router();

router.post(
  '/addProblem',
  // verifyAccessToken,
  // validatorMiddleware(problemSchema),
  addProblem,
  addProblemConstraints,
  addProblemParaStatements,
  addExamples
);

router.get('/allProblems', allProblems);
router.get('/problem/:id', getSingleProblem)
router.post('/problem/examples', getSingleProblemExamples)
router.get('/problem/constraints/:id', getSingleProblemConstraint)
router.get('/problem/paraStatements/:id', getSingleProblemParaStatement)
export default router;
