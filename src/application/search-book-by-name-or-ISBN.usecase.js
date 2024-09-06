const { Either } = require("../shared/errors");

module.exports = function searchBookByNameOrISBNUsecase({ booksRepository }) {
  return async function ({ valor }) {
    const books = await booksRepository.searchBookByNameOrISBN(valor);
    return Either.Right(books);
  };
};
