const returnBookUsecase = require("../../../application/return-book.usecase");
const {
  lendsRepository,
} = require("../../../infra/db/typeorm/repositories/lends.repository");
const returnBookController = require("../../../interface-adapters/controllers/Book/returnBookController");

module.exports = async function (httpRequest) {
  const lendsRepositoryFn = lendsRepository();

  const returnBookUseCaseFn = returnBookUsecase({
    lendsRepository: lendsRepositoryFn,
  });

  const controller = await returnBookController({
    returnBookUseCase: returnBookUseCaseFn,
    httpRequest,
  });

  return controller;
};
