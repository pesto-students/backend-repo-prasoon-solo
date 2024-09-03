import express from 'express';
import postgres from 'postgres';
import { configDotenv } from 'dotenv';
import * as bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import {z} from 'zod';


const prisma = new PrismaClient();

import authRouter from './routes/authRoutes.js';
import {validatorMiddleware} from './middlewares/validator.js';
import { loginUserSchema, signupUserSchema } from './validators/authValidators.js';
import problemRouter from './routes/problemRoutes.js';

const app = express();
configDotenv();
app.use(express.json());


const PROBLEMS = [
  {
    id: 1,
    title: 'Two sum',
    difficulty: 'Medium',
    category: 'Array',
    order: 1,
    videoId: 'sdsdsds',
    problemStatement: {
      para1:'first para',
      para2:'first para',
      para3:'first para',
      para4:'first para',
    },
    problemPoints:{
      point1:'this is point 1',
      point2:'this is point 2',
      point3:'this is point 3',
      point4:'this is point 4',
    },
    allExamples: {
      example1: {
        id: 1,
        imageUrl: 'sdsdsd',
        inputText: 'nums = [2,7,11,15], target = 9',
        outputText: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      example2: {
        id: 2,
        imageUrl: 'sdsdsd',
        inputText: 'nums = [3,2,4], target = 6',
        outputText: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
      example3: {
        id: 3,
        imageUrl: 'sdsdsd',
        inputText: ' nums = [3,3], target = 6',
        outputText: '[0,1]',
      },
    },
    allConstraints: {
      constraint1: '<code>[0,5000]</code>',
      constraint2: '<code>[0,5000]</code>',
      constraint3: '<code>[0,5000]</code>',
      constraint4: 'this will render as plain text not coded',
      constraint5: '',
    },
  },
];


// all routes will be here

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/problems', problemRouter);


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
    if (typeof id === 'number') {
      const [result] = await sql`SELECT * from problems WHERE id = ${id}`;
      res.json(result);
    } else {
      res.json({ message: 'problem id must be a number' });
    }
  } catch (error) {
    console.log('error', error);
    res.json({ message: 'Something went wrong' });
  }
});

app.get('/', async (req, res) => {
  const result = await sql`select * from playing_with_neon`;
  console.log('result=>', result);
  res.json(result);
});
app.get('/allemployees', async (req, res) => {
  try {
    await prisma.$connect();
    const allemployees = await prisma.employee.findMany({
      where: { name: 'prasoon' },
    });
    res.json(allemployees);
  } catch (error) {
    console.log('error', error);
    res.json({ message: 'Somthing went wrong' });
    await prisma.$disconnect();
  }
});
app.post('/prismaemployee', async (req, res) => {
  try {
    await prisma.$connect();
    const user = await prisma.employee.create({
      data: {
        name: 'prasoon',
        email: 'chatterjeeprasoon@gmail.com',
        role: 'INTERN',
      },
    });
    res.json(user);
    await prisma.$disconnect();
  } catch (error) {
    console.log('error=>', error);
    res.json({ message: 'Somthing went wrong' });
    await prisma.$disconnect();
  }
});

app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'Request not found' });
});

app.listen(8080, () => {
  console.log('server running in port 8080');
});
