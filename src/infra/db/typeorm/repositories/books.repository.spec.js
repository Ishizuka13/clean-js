const { BooksRepository } = require("./books.repository");

describe("Books Repository Typeorm", function () {
  let sut;

  beforeAll(function () {
    sut = BooksRepository();
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
});
