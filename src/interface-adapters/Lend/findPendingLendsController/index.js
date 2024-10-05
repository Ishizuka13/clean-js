const { AppError } = require("../../../shared/errors");
const httpResponse = require("../../../shared/helpers/http.response");

module.exports = async function findPendingLendsController({
  findPendingLendsUseCase,
}) {
  if (!findPendingLendsUseCase) throw new AppError(AppError.dependencies);

  const output = await findPendingLendsUseCase({});

  return output.fold(
    (err) => httpResponse(400, err.message),
    (lends) => httpResponse(200, lends)
  );
};
