const findPendings = require("../../../../tests/fixtures/find-pendings.js");
const AppError = require("../../../shared/errors/AppError.js");
const Either = require("../../../shared/errors/Either.js");
const httpResponse = require("../../../shared/helpers/http.response.js");
const findPendingLendsController = require("./index.js");

describe("find Pending Lends Controller", function () {
  const findPendingLendsUseCase = jest.fn();

  test("Must return a httpResponse 200 and lends if found", async function () {
    findPendingLendsUseCase.mockResolvedValue(Either.Right(findPendings));

    const response = await findPendingLendsController({
      findPendingLendsUseCase,
    });

    expect(response).toEqual(httpResponse(200, findPendings));
  });

  test("Must return a throw AppError if findPendingLendsUseCase is not provided", async function () {
    expect(() => findPendingLendsController({})).rejects.toThrow(
      new AppError(AppError.dependencies)
    );
  });
});
