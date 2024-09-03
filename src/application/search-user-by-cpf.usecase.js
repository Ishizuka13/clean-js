const { Either, AppError } = require("../shared/errors");

module.exports = function searchUserByCPFUseCase({ usersRepository }) {
  if (!usersRepository) throw new AppError(AppError.dependencies);
  return async function ({ CPF }) {
    if (!CPF) throw new AppError(AppError.requiredParams);
    const user = await usersRepository.searchByCPF(CPF);
    return Either.Right(user);
  };
};
