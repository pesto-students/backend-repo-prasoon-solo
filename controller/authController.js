import validator from 'validator';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { sql } from '../database/db.js';

const signup = async (req, res, next) => {
  try {
    const { email, password, fullname } = req.body;
    if (!validator.isEmail(email)) res.json({ message: 'Email not valid' });
    else if (!validator.isLength(fullname, { min: 6 }))
      res.json({ message: 'Full name must be 6 characters' });
    else if (!validator.isLength(password, { min: 6 }))
      res.json({ message: 'Password must be 6 character long' });
    else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const [result] =
        await sql`INSERT INTO users(fullname,email,password) VALUES(${fullname},${email},${passwordHash}) RETURNING *`;
      res.json(result);
    }
  } catch (e) {
    console.log('e=>>>', e);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const login = async (req, res, next) => {
  try {
    var { email, password } = req.body;
    if (!validator.isEmail(email)) res.json({ message: 'Email not valid' });
    else if (!validator.isLength(password, { min: 6 }))
      res.json({ message: 'Password must be 6 character long' });
    else {
      const [result] = await sql`SELECT * from users WHERE email = ${email}`;
      console.log('result=>', result);
      const isPasswordMatch = bcrypt.compare(password, result.password);
      if (!isPasswordMatch) res.json({ message: 'Password doesnt match' });
      else {
        const accessToken = jwt.sign(
          { id: result.id },
          process.env.JWT_SECRET,
          { expiresIn: '14m' }
        );
        const refreshToken = jwt.sign(
          { id: result.id },
          process.env.JWT_SECRET,
          { expiresIn: '30d' }
        );
        res.json({ accessToken, refreshToken, email });
      }
    }
  } catch (e) {
    console.log('e', e);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export { signup, login };
