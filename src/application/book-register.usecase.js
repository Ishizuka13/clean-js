const { Either, AppError } = require("../shared/errors");

module.exports = function bookRegisterUseCase({ booksRepository }) {
  if (!booksRepository) throw new AppError(AppError.dependencies);
  return async function ({ nome, quantidade, autor, genero, ISBN }) {
    await booksRepository.register({ nome, quantidade, autor, genero, ISBN });
    return Either.Right(null);
  };
};
