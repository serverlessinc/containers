/**
 * Custom error class for AI streaming errors
 */
class AIStreamingError extends Error {
  /**
   * Creates an AI streaming error
   * 
   * @param {string} message - Error message
   * @param {Error} originalError - Original error object
   */
  constructor(message, originalError) {
    super(message);
    this.name = "AIStreamingError";
    this.status = 500;
    this.code = "ai_streaming_error";
    this.originalError = originalError;
  }
}

module.exports = { AIStreamingError }; 