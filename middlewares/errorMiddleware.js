// middlewares/errorMiddleware.js

// Not Found Error Handler
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// General Error Handler
export const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', err);
  
  // Set status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    error: true
  });
};