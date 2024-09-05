const { AppError } = require("../shared/errors");
const bookRegisterUsecase = require("./book-register.usecase");

describe("Book register UseCase", function () {
  const booksRepository = {
    register: jest.fn(),
  };

  test("Must be able to register a book", async function () {
    const livroDTO = {
      nome: "nome_valido",
      quantidade: "quantidade_valida",
      autor: "autor_valido",
      genero: "genero_valido",
      ISBN: "ISBN_valido",
    };

    const sut = bookRegisterUsecase({ booksRepository });
    const output = await sut(livroDTO);

    expect(output.right).toBeNull();
    expect(booksRepository.register).toHaveBeenLastCalledWith(livroDTO);
    expect(booksRepository.register).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if the book is not provided", function () {
    expect(() => bookRegisterUsecase({})).toThrow(
      new AppError(AppError.dependencies)
    );
  });

  test("Must return a throw AppError if the required inputs are not provided", async function () {
    const sut = bookRegisterUsecase({ booksRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.requiredParams)
    );
  });
});
