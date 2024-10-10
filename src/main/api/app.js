require("express-async-errors");
const express = require("express");
const { routes } = require("./routes");
const { ZodError } = require("zod");
const { typeormServer } = require("../../infra/db/typeorm/setup");

const app = express();

app.use(express.json());

typeormServer
  .initialize()
  .then(() => {
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
  })
  .catch((err) => {
    console.log("Erro durante a inicialização do servidor.", err);
  });

module.exports = { app };
