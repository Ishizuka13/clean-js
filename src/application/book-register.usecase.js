const { Either, AppError } = require("../shared/errors");

module.exports = function bookRegisterUseCase({ booksRepository }) {
  if (!booksRepository) throw new AppError(AppError.dependencies);
  return async function ({ nome, quantidade, autor, genero, ISBN }) {
    const checkedInputs = nome && quantidade && autor && genero && ISBN;
    console.log(nome, ISBN, quantidade, autor, genero);
    console.log(checkedInputs);

    if (!checkedInputs) throw new AppError(AppError.requiredParams);

    const checkIfISBNAlreadyExists = await booksRepository.foundByISBN(ISBN);
    if (checkIfISBNAlreadyExists)
      return Either.Left(Either.valueAlreadyRegistered("ISBN"));

    await booksRepository.register({ nome, quantidade, autor, genero, ISBN });
    return Either.Right(null);
  };
};
