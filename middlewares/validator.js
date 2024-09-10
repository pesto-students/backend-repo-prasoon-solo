const validatorMiddleware = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    // console.log('req.body validator====>', req.body)
    req.body = parseBody;
    console.log('validator successfull=====>>>>>')
    next();
  } catch (error) {
    console.log('validation error==>', error)
    next(error)
  }
};


export {validatorMiddleware}