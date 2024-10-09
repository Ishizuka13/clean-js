const findBookByNameOrISBNUsecase = require("../../../application/find-book-by-name-or-ISBN.usecase");
const {
  BooksRepository,
} = require("../../../infra/db/typeorm/repositories/books.repository");
const findBookByNameOrISBNController = require("../../../interface-adapters/controllers/Book/findBookByNameOrISBNController");

module.exports = async function findBookByNameOrISBN(httpRequest) {
  const booksRepositoryFn = BooksRepository();

  const findBookByNameOrISBNUseCaseFn = findBookByNameOrISBNUsecase({
    booksRepository: booksRepositoryFn,
  });

  const controller = await findBookByNameOrISBNController({
    findBookByNameOrISBNUseCase: findBookByNameOrISBNUseCaseFn,
    httpRequest,
  });

  return controller;
};
