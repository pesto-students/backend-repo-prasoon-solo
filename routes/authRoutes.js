import { Router } from 'express';
import { login, signup } from '../controller/authController.js';
import { validatorMiddleware } from '../middlewares/validator.js';
import {
  loginUserSchema,
  signupUserSchema,
} from '../validators/authValidators.js';

const router = Router();

router.post(
  '/signup',
  validatorMiddleware(signupUserSchema),
  signup,
  validatorMiddleware(loginUserSchema),
  login
);

router.post('/login', validatorMiddleware(loginUserSchema), login);

export default router;
