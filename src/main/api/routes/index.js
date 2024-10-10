const { Router } = require("express");
const { usersRoutes } = require("./users.routes");
const { booksRoutes } = require("./books.routes");
const { lendsRoutes } = require("./lends.routes");

const routes = Router();

routes.use("/user", usersRoutes);
routes.use("/book", booksRoutes);
routes.use("/lend", lendsRoutes);

module.exports = { routes };
