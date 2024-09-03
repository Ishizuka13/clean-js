const { Either } = require("../shared/errors");

module.exports = function bookRegisterUseCase({ booksRepository }) {
  return async function ({ nome, quantidade, autor, genero, ISBN }) {
    await booksRepository.register({ nome, quantidade, autor, genero, ISBN });
    return Either.Right(null);
  };
};
