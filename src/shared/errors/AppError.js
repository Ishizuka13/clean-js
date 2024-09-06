module.exports = class AppError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }

  static dependencies = "A required dependency was not provided";
  static requiredParams = "A required param was not provided";
};
