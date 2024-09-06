const { AppError } = require("../shared/errors");
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

  test("Must return a null array when the name or ISBN does not exists", async function () {
    const nomeISBNDTO = {
      valor: "valor_nao_cadastrado",
    };
    booksRepository.searchBookByNameOrISBN.mockResolvedValue([]);
    const sut = searchBookByNameOrISBNUsecase({ booksRepository });
    const output = await sut(nomeISBNDTO);

    expect(output.right).toEqual([]);
    expect(booksRepository.searchBookByNameOrISBN).toHaveBeenCalledWith(
      nomeISBNDTO.valor
    );
    expect(booksRepository.searchBookByNameOrISBN).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if the booksRepository is not provided", function () {
    expect(() => searchBookByNameOrISBNUsecase({})).toThrow(
      new AppError(AppError.dependencies)
    );
  });

  test("Must return a throw AppError if the required input is not provided", async function () {
    const sut = searchBookByNameOrISBNUsecase({ booksRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.requiredParams)
    );
  });
});
