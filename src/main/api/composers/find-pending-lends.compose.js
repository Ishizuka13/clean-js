const findPendingLendsUsecase = require("../../../application/find-pending-lends.usecase");
const {
  lendsRepository,
} = require("../../../infra/db/typeorm/repositories/lends.repository");
const findPendingLendsController = require("../../../interface-adapters/Lend/findPendingLendsController");

module.exports = async function findPendingLendsCompose() {
  const lendsRepositoryFn = lendsRepository();

  const findPendingLendsUseCaseFn = findPendingLendsUsecase({
    lendsRepository: lendsRepositoryFn,
  });

  const controller = await findPendingLendsController({
    findPendingLendsUseCase: findPendingLendsUseCaseFn,
  });

  return controller;
};
