const { Router } = require("express");
const lendBookCompose = require("../composers/lend-book.compose");
const returnBookCompose = require("../composers/return-book.compose");
const findPendingLendsCompose = require("../composers/find-pending-lends.compose");

const lendsRoutes = Router();

lendsRoutes.get("/", async (req, res) => {
  const httpRequest = {
    body: req.body,
    params: req.params,
  };

  const { statusCode, body } = await findPendingLendsCompose(httpRequest);

  res.status(statusCode).json(body);
});

lendsRoutes.post("/", async (req, res) => {
  const httpRequest = {
    body: req.body,
  };

  const { statusCode, body } = await lendBookCompose(httpRequest);

  res.status(statusCode).json(body);
});

lendsRoutes.put("/return/:emprestimo_id", async (req, res) => {
  const httpRequest = {
    body: req.body,
    params: req.params,
  };

  const { statusCode, body } = await returnBookCompose(httpRequest);

  res.status(statusCode).json(body);
});

module.exports = { lendsRoutes };
