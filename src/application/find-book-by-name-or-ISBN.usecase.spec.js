const { AppError } = require("../shared/errors");
const findBookByNameOrISBNUsecase = require("./find-book-by-name-or-ISBN.usecase");

describe("Search books by name or ISBN UseCase", function () {
  const booksRepository = {
    findByNameOrISBN: jest.fn(),
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
    booksRepository.findByNameOrISBN.mockResolvedValue(outputDTO);

    const sut = findBookByNameOrISBNUsecase({ booksRepository });
    const output = await sut(nomeISBNDTO);

    expect(output.right).toEqual(outputDTO);
    expect(booksRepository.findByNameOrISBN).toHaveBeenCalledWith(
      nomeISBNDTO.valor
    );
    expect(booksRepository.findByNameOrISBN).toHaveBeenCalledTimes(1);
  });

  test("Must return a null array when the name or ISBN does not exists", async function () {
    const nomeISBNDTO = {
      valor: "valor_nao_cadastrado",
    };
    booksRepository.findByNameOrISBN.mockResolvedValue([]);
    const sut = findBookByNameOrISBNUsecase({ booksRepository });
    const output = await sut(nomeISBNDTO);

    expect(output.right).toEqual([]);
    expect(booksRepository.findByNameOrISBN).toHaveBeenCalledWith(
      nomeISBNDTO.valor
    );
    expect(booksRepository.findByNameOrISBN).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if the booksRepository is not provided", function () {
    expect(() => findBookByNameOrISBNUsecase({})).toThrow(
      new AppError(AppError.dependencies)
    );
  });

  test("Must return a throw AppError if the required input is not provided", async function () {
    const sut = findBookByNameOrISBNUsecase({ booksRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.requiredParams)
    );
  });
});
