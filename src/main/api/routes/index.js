const { Router } = require("express");
const { usersRoutes } = require("./users.routes");
const { booksRoutes } = require("./books.routes");

const routes = Router();

routes.use("/user", usersRoutes);
routes.use("/book", booksRoutes);

module.exports = { routes };
