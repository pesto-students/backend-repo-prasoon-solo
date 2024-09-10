import jwt from 'jsonwebtoken';
import { prisma } from '../database/db.js';

const verifyAccessToken = async (req,res,next) => {
  try {
    const headers = req.headers;
    const bearer = headers.authorization;
    const accessToken = bearer.slice(7);
    const verify = jwt.verify(accessToken,process.env.JWT_SECRET);
    await prisma.$connect()
    const user = await prisma.user.findUnique({where:{id:verify.id}})
    delete user.password;
    req.user = user;
    next();
  } catch(error) {
    error.statusCode = 401;
    console.log('error', error)
    next(error)
  }
}


export {verifyAccessToken}