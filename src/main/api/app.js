require("express-async-errors");
const express = require("express");
const { routes } = require("./routes");
const { ZodError } = require("zod");

const app = express();

app.use(express.json());

app.use(routes);

app.use(function (err, req, res, next) {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "Erro de validacao", errors: err.flatten() });
  }

  if (process.env.NODE !== "production") console.log(err);
  return res.status(500).json({ message: "Erro interno do servidor" });
});

module.exports = { app };
