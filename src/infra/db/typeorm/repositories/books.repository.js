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

  const ISBNExists = async function (ISBN) {
    const book = await typeormBooksRepository.count({
      where: { ISBN },
    });

    return book === 0 ? false : true;
  };

  return { register, ISBNExists };
};

module.exports = { BooksRepository, typeormBooksRepository };
