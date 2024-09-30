const typeorm = require("typeorm");

const typeormServer = new typeorm.DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  dropSchema: true,
  entities: [
    require("./entities/User.entity-typeorm"),
    require("./entities/Book.entity-typeorm"),
    require("./entities/Lend.entity-typeorm"),
  ],
});

module.exports = { typeormServer };
