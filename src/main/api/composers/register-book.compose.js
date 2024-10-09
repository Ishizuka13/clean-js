const bookRegisterUsecase = require("../../../application/book-register.usecase");
const {
  BooksRepository,
} = require("../../../infra/db/typeorm/repositories/books.repository");
const bookRegisterController = require("../../../interface-adapters/controllers/Book/bookRegisterController");

module.exports = async function registerBookCompose(httpRequest) {
  const booksRepositoryFn = BooksRepository();

  const bookRegisterUseCaseFn = bookRegisterUsecase({
    booksRepository: booksRepositoryFn,
  });

  const controller = await bookRegisterController({
    registerBookUseCase: bookRegisterUseCaseFn,
    httpRequest,
  });

  return controller;
};
