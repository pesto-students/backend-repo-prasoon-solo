import jwt from 'jsonwebtoken';

const verifyAccessToken = async (req,res,next) => {
  try {
    const headers = req.headers;
    const bearer = headers.authorization;
    const accessToken = bearer.slice(7);
    const verify = jwt.verify(accessToken,process.env.JWT_SECRET);
    req.user = verify;
    next();
  } catch(error) {
    console.log('error', error)
    next(error)
  }
}


export {verifyAccessToken}