const validatorMiddleware = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    console.log('validator successfull=====>>>>>')
    next();
  } catch (error) {
    console.log('error', error)
    res.status(400).json({ message: 'validation failed' });
  }
};


export {validatorMiddleware}