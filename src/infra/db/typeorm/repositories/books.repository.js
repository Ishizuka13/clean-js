const { Like } = require("typeorm");
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

  const findByNameOrISBN = async function (valor) {
    const book = await typeormBooksRepository.find({
      where: [{ nome: Like(`%${valor}%`) }, { ISBN: valor }],
    });

    return book;
  };

  return { register, ISBNExists, findByNameOrISBN };
};

module.exports = { BooksRepository, typeormBooksRepository };
