const { Router } = require("express");
const {
  usersRepository,
} = require("../../../infra/db/typeorm/repositories/users.repository");
const userRegisterUsecase = require("../../../application/user-register.usecase");
const registerUserController = require("../../../interface-adapters/controllers/User/registerUserController");

const usersRoutes = Router();

usersRoutes.post("/", async (req, res) => {
  const httpRequest = {
    body: req.body,
  };

  const usersRepositoryFn = usersRepository();
  const userRegisterUseCaseFn = userRegisterUsecase({
    usersRepository: usersRepositoryFn,
  });

  const { statusCode, body } = registerUserController({
    userRegisterUseCaseFn,
    httpRequest,
  });

  return response.status(statusCode).json(body);
});

module.exports = { usersRoutes };
