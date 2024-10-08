const { Either, AppError } = require("../shared/errors");

module.exports = function findUserByCPFUseCase({ usersRepository }) {
  if (!usersRepository) throw new AppError(AppError.dependencies);
  return async function ({ CPF }) {
    if (!CPF) throw new AppError(AppError.requiredParams);
    const user = await usersRepository.findByCPF(CPF);
    return Either.Right(user);
  };
};
