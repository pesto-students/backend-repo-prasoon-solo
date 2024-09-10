import { Router } from 'express';
import { login, signup , refreshAccessToken} from '../controller/authController.js';
import { validatorMiddleware } from '../middlewares/validator.js';
import {
  loginUserSchema,
  refreshAccessTokenSchema,
  signupUserSchema,
} from '../validators/authValidators.js';

const router = Router();

router.post(
  '/register',
  validatorMiddleware(signupUserSchema),
  signup,
  validatorMiddleware(loginUserSchema),
  login
);

router.post('/login', validatorMiddleware(loginUserSchema), login);
router.post('/refreshAccessToken', validatorMiddleware(refreshAccessTokenSchema),refreshAccessToken);


export default router;
