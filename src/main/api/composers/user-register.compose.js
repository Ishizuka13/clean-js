const userRegisterUsecase = require("../../../application/user-register.usecase");
const {
  usersRepository,
} = require("../../../infra/db/typeorm/repositories/users.repository");

module.exports = async function userRegisterCompose(httpRequest) {
  const usersRepositoryFn = usersRepository();
  const userRegisterUseCaseFn = userRegisterUsecase({
    usersRepository: usersRepositoryFn,
  });

  const controller = registerUserController({
    userRegisterUseCaseFn,
    httpRequest,
  });

  return controller;
};
