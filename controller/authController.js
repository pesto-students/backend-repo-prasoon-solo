import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../database/db.js';

const signup = async (req, res, next) => {
  try {
    const { email, password, fullName, role } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    await prisma.$connect();
    const result = await prisma.user.create({
      data: { email, fullName, role, password: passwordHash },
    });
    await prisma.$disconnect();
    next();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    var { email, password } = req.body;
    await prisma.$connect();
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) res.json({ message: 'Password doesnt match' });
    else {
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      delete user.password;
      res.json({ accessToken, refreshToken, user });
    }
  } catch (error) {
    console.log('error-------', error);
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    );
    const newAccessToken = jwt.sign(
      decodedRefreshToken,
      process.env.JWT_SECRET
    );
    res.json(newAccessToken);
  } catch (error) {
    next(error);
  }
};
export { signup, login, refreshAccessToken };
