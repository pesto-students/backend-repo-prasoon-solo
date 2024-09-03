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
    res.json(result);
  } catch (e) {
    console.log('e=>>>', e);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const login = async (req, res, next) => {
  try {
    var { email, password } = req.body;
    await prisma.$connect();
    const result = await prisma.user.findUniqueOrThrow({ where: { email } });
    const isPasswordMatch = bcrypt.compare(password, result.password);
    if (!isPasswordMatch) res.json({ message: 'Password doesnt match' });
    else {
      const accessToken = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
        expiresIn: '14m',
      });
      const refreshToken = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      res.json({ accessToken, refreshToken, email });
    }
  } catch (e) {
    console.log('e==>', e);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export { signup, login };
