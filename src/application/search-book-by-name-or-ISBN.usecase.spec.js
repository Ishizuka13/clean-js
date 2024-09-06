const searchBookByNameOrISBNUsecase = require("./search-book-by-name-or-ISBN.usecase");

describe("Search books by name or ISBN UseCase", function () {
  const booksRepository = {
    searchBookByNameOrISBN: jest.fn(),
  };

  test("Must return a valid book when searched by name or ISBN", async function () {
    const nomeISBNDTO = {
      valor: "valor_valido",
    };

    const outputDTO = [
      {
        id: "id_valido",
        nome: "valor_valido",
        autor: "autor_valido",
        genero: "genero_valido",
        ISBN: "valor_valido",
      },
    ];
    booksRepository.searchBookByNameOrISBN.mockResolvedValue(outputDTO);

    const sut = searchBookByNameOrISBNUsecase({ booksRepository });
    const output = await sut(nomeISBNDTO);

    expect(output.right).toEqual(outputDTO);
    expect(booksRepository.searchBookByNameOrISBN).toHaveBeenCalledWith(
      nomeISBNDTO.valor
    );
    expect(booksRepository.searchBookByNameOrISBN).toHaveBeenCalledTimes(1);
  });
});
