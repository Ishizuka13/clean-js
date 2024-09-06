const { Either, AppError } = require("../shared/errors");

module.exports = function searchBookByNameOrISBNUsecase({ booksRepository }) {
  if (!booksRepository) throw new AppError(AppError.dependencies);
  return async function ({ valor }) {
    if (!valor) throw new AppError(AppError.requiredParams);
    const books = await booksRepository.searchBookByNameOrISBN(valor);
    return Either.Right(books);
  };
};
