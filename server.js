import express from 'express';
import postgres from 'postgres';
import { configDotenv } from 'dotenv';
import * as bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

import authRouter from './routes/authRoutes.js';

const app = express();
configDotenv();
app.use(express.json());
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

const PROBLEMS = [
  {
    id: 1,
    title: 'Two sum',
    difficulty: 'Medium',
    category: 'Array',
    order: 1,
    videoId: 'sdsdsds',
  },
];

// all routes will be here

app.use('/api/v1/auth', authRouter);




const login = async (req, res) => {
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
app.post('/login', login);

app.get('/users', async (req, res) => {
  const result = await sql`SELECT * FROM users`;
  res.json(result);
});

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
      await sql`INSERT INTO users(fullname,email,password) VALUES(${fullname},${email},${passwordHash})`;
      next();
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

app.post('/signup', signup, login);

app.get('/allproblems', async (req, res) => {
  const result = await sql`SELECT * from problems`;
  res.json(result);
});

app.post('/addProblem', async (req, res) => {
  try {
    const { title, category, difficulty, orderNum, videoId } = req.body;
    if (!validator.isLength(title, { min: 8 }))
      res.json({ message: 'title must be 8 characters long' });
    else if (!validator.isLength(category, { min: 5 }))
      res.json({ message: 'category must be 5 characters long' });
    else if (
      !(
        validator.equals(difficulty, 'easy') ||
        validator.equals(difficulty, 'medium') ||
        validator.equals(difficulty, 'hard')
      )
    )
      res.json({ message: 'difficulty must be easy , medium or hard only' });
    else if (
      !(typeof orderNum === 'number') &&
      validator.isInt(String(orderNum))
    )
      res.json({ message: 'category must be 5 characters long' });
    else {
      const [result] =
        await sql`INSERT INTO problems (title,category,difficulty,orderNum, videoId) VALUES (${title} , ${category} , ${difficulty} , ${orderNum} , ${videoId} ) RETURNING *`;
      res.json(result);
    }
  } catch (e) {
    console.log('e', e);
    res.json({ message: 'something went wrong' });
  }
});

app.post('/problem', async (req, res) => {
  try {
  const { id } = req.body;
  if(typeof(id) === 'number') {
    const [result] = await sql`SELECT * from problems WHERE id = ${id}`;
    res.json(result);
  } else {
    res.json({message:'problem id must be a number'})
  }
  } catch (error) {
    console.log('error', error)
    res.json({message:'Something went wrong'})
  }
});

app.get('/', async (req, res) => {
  const result = await sql`select * from playing_with_neon`;
  console.log('result=>', result);
  res.json(result);
});

app.use('*',(req,res,next)=>{
  res.status(404).json({message:'Request not found'})
})

app.listen(8080, () => {
  console.log('server running in port 8080');
});
