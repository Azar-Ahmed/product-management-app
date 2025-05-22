
const errorHandler = (err, req, res) => {
  console.error(err); // Log error in console (you can enhance this with Winston/LogDNA)

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;
