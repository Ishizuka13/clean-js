const { Either, AppError } = require("../shared/errors");

module.exports = function searchLendsUseCase({ lendsRepository }) {
  if (!lendsRepository) throw new AppError(AppError.dependencies);

  return async function () {
    const pendingLends = await lendsRepository.findPendings();
    return Either.Right(pendingLends);
  };
};
