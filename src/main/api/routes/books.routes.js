const { Router } = require("express");
const registerBookCompose = require("../composers/register-book.compose");
const findByNameOrIsbnCompose = require("../composers/find-by-name-or-isbn.compose");

const booksRoutes = Router();

booksRoutes.post("/", async (req, res) => {
  const httpRequest = {
    body: req.body,
  };

  const { statusCode, body } = await registerBookCompose(httpRequest);

  return res.status(statusCode).json(body);
});

booksRoutes.get("/", async (req, res) => {
  const httpRequest = {
    query: req.query,
  };

  const { statusCode, body } = await findByNameOrIsbnCompose(httpRequest);

  return res.status(statusCode).json(body);
});

module.exports = { booksRoutes };
