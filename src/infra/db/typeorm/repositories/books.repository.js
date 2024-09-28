const { typeormServer } = require("../setup");

const typeormBooksRepository = typeormServer.getRepository("Livro");

const BooksRepository = function () {
  const register = async function ({ nome, quantidade, autor, genero, ISBN }) {
    await typeormBooksRepository.save({
      nome,
      quantidade,
      autor,
      genero,
      ISBN,
    });
  };

  return { register };
};

module.exports = { BooksRepository, typeormBooksRepository };
