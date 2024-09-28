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

  test("Must return a complete book if find by name", async function () {
    await typeormBooksRepository.save(bookDTO);

    const findBookByName = await sut.findByNameOrISBN("nome_valido");

    expect(findBookByName).toHaveLength(1);
    expect(findBookByName[0].nome).toBe("nome_valido");
  });

  test("Must return a complete book if find by ISBN", async function () {
    await typeormBooksRepository.save(bookDTO);

    const findBookByISBN = await sut.findByNameOrISBN("ISBN_valido");

    expect(findBookByISBN).toHaveLength(1);
    expect(findBookByISBN[0].ISBN).toBe("ISBN_valido");
  });

  test("Must return an empty array book if can not find book by name or ISBN", async function () {
    await typeormBooksRepository.save(bookDTO);

    const findBookByNameOrISBN = await sut.findByNameOrISBN("ISBN_invalido");

    expect(findBookByNameOrISBN).toHaveLength(0);
  });
});
