const { resolve } = require("path");
const typeorm = require("typeorm");

let typeormServer;

if (process.env.NODE_ENV === "test") {
  typeormServer = new typeorm.DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    dropSchema: true,
    entities: [
      resolve(__dirname, "entities/*.entity-typeorm.js"),
      // require("./entities/User.entity-typeorm"),
      // require("./entities/Book.entity-typeorm"),
      // require("./entities/Lend.entity-typeorm"),
    ],
  });
} else if (process.env.NODE_ENV === "integration") {
  typeormServer = new typeorm.DataSource({
    type: "postgres",
    host: "localhost",
    database: "biblioteca_test",
    synchronize: true,
    port: 5432,
    username: "postgres",
    password: "123456",
    entities: [
      resolve(__dirname, "entities/*.entity-typeorm.js"),
      // require("./entities/User.entity-typeorm"),
      // require("./entities/Book.entity-typeorm"),
      // require("./entities/Lend.entity-typeorm"),
    ],
  });
}

module.exports = { typeormServer };
