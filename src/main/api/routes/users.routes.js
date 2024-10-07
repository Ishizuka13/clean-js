const { Router } = require("express");

const userRegisterCompose = require("../composers/user-register.compose");

const usersRoutes = Router();

usersRoutes.post("/", async (req, res) => {
  const httpRequest = {
    body: req.body,
  };

  const { statusCode, body } = await userRegisterCompose(httpRequest);

  return res.status(statusCode).json(body);
});

module.exports = { usersRoutes };
