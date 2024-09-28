const {
  BooksRepository,
  typeormBooksRepository,
} = require("./books.repository");

describe("Books Repository Typeorm", function () {
  let sut;

  beforeAll(function () {
    sut = BooksRepository();
  });

  beforeEach(async function () {
    await typeormBooksRepository.delete({});
  });

  const bookDTO = {
    nome: "nome_valido",
    quantidade: 3,
    autor: "autor_valido",
    genero: "genero_valido",
    ISBN: "ISBN_valido",
  };

  test("Must return void when created book", async function () {
    const createdBook = await sut.register(bookDTO);

    expect(createdBook).toBeUndefined();
  });

  test("Must return true if book's ISBN exists", async function () {
    await typeormBooksRepository.save(bookDTO);

    const ISBNExists = await sut.ISBNExists("ISBN_valido");

    expect(ISBNExists).toBe(true);
  });
  test("Must return false if book by ISBN does not exists", async function () {
    await typeormBooksRepository.save(bookDTO);

    const ISBNExists = await sut.ISBNExists("ISBN_invalido");

    expect(ISBNExists).toBe(false);
  });
});
