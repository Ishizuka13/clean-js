const findUserByCPFUsecase = require("../../../application/find-user-by-cpf.usecase");
const {
  usersRepository,
} = require("../../../infra/db/typeorm/repositories/users.repository");
const findUserByCPFController = require("../../../interface-adapters/controllers/User/findUserByCPFController");

module.exports = async function findUserByCPFCompose(httpRequest) {
  const usersRepositoryFn = usersRepository();
  const findUserByCPFUseCaseFn = findUserByCPFUsecase({
    usersRepository: usersRepositoryFn,
  });

  const controller = await findUserByCPFController({
    findUserByCPFUseCase: findUserByCPFUseCaseFn,
    httpRequest,
  });

  return controller;
};
