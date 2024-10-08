const { Router } = require("express");

const userRegisterCompose = require("../composers/user-register.compose");
const findUserByCpfCompose = require("../composers/find-user-by-cpf.compose");

const usersRoutes = Router();

usersRoutes.post("/", async (req, res) => {
  const httpRequest = {
    body: req.body,
  };

  const { statusCode, body } = await userRegisterCompose(httpRequest);

  return res.status(statusCode).json(body);
});

usersRoutes.get("/cpf/:CPF", async (req, res) => {
  const httpRequest = {
    params: req.params,
  };

  const { statusCode, body } = await findUserByCpfCompose(httpRequest);

  return res.status(statusCode).json(body);
});

module.exports = { usersRoutes };
