const userRegisterUsecase = require("../../../application/user-register.usecase");
const {
  usersRepository,
} = require("../../../infra/db/typeorm/repositories/users.repository");
const registerUserController = require("../../../interface-adapters/controllers/User/registerUserController");

module.exports = async function userRegisterCompose(httpRequest) {
  const usersRepositoryFn = usersRepository();
  const userRegisterUseCaseFn = userRegisterUsecase({
    usersRepository: usersRepositoryFn,
  });

  const controller = registerUserController({
    userRegisterUseCase: userRegisterUseCaseFn,
    httpRequest,
  });

  return controller;
};
