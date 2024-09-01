const AppError = require("./AppError");

describe("AppError", function () {
  test("AppError instance of Error", function () {
    const appError = new AppError("erro");
    expect(appError).toBeInstanceOf(Error);
  });
  test("AppError has a correct message", function () {
    const message = "Error message";
    const appError = new AppError(message);
    expect(appError.message).toBe(message);
  });
});
