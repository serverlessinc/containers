/**
 * Global error handling middleware
 * 
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const code = err.code || "internal_error";

  res.status(status).json({
    error: message,
    message,
    code,
    status,
  });
}

module.exports = { errorHandler }; 