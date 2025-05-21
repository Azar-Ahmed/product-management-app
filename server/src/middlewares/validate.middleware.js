export const validate = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false, // return all errors
    allowUnknown: true, // allow extra fields (optional)
    stripUnknown: true, // remove unknown fields
  };

  const { error, value } = schema.validate(req.body, options);
  if (error) {
     const details = error.details.map((d) => 
      d.message.replace(/\"/g, "") // remove all double quotes
    );

    return res.status(400).json({
      message: "Validation error",
      details,
    });
  }
  req.body = value; // sanitized data
  next();
};