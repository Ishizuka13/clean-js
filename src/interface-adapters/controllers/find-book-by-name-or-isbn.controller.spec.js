const { ZodError } = require("zod");
const { Either, AppError } = require("../../shared/errors");
const httpResponse = require("../../shared/helpers/http.response");
const findBookByNameOrIsbnController = require("./find-book-by-name-or-isbn.controller");

describe("Find Book By Name Or ISBN Controller", function () {
  const findBookByNameOrISBNUseCase = jest.fn();

  test("Must return a httpResponse 200 and books if success on search", async function () {
    const bookDTO = {
      id: "qualquer_id",
      nome: "qualquer_nome",
      quantida: 1,
      autor: "qualquer_autor",
      genero: "qualquer_genero",
      ISBN: "qualquer_ISBN",
    };

    findBookByNameOrISBNUseCase.mockResolvedValue(Either.Right(bookDTO));

    const httpRequest = {
      query: {
        valor: "qualquer_ISBN",
      },
    };

    const response = await findBookByNameOrIsbnController({
      findBookByNameOrISBNUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(200, bookDTO));
    expect(findBookByNameOrISBNUseCase).toHaveBeenCalledWith(httpRequest.query);
    expect(findBookByNameOrISBNUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a httpResponse 200 and an empty array if not success on search", async function () {
    findBookByNameOrISBNUseCase.mockResolvedValue(Either.Right([]));

    const httpRequest = {
      query: {
        valor: "qualquer_ISBN",
      },
    };

    const response = await findBookByNameOrIsbnController({
      findBookByNameOrISBNUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(200, []));
    expect(findBookByNameOrISBNUseCase).toHaveBeenCalledWith(httpRequest.query);
    expect(findBookByNameOrISBNUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if the required params are not provided", async function () {
    expect(() => findBookByNameOrIsbnController({})).rejects.toThrow(
      new AppError(AppError.dependencies)
    );
  });

  test("Must return a ZodValidator if error on validation of required data", async function () {
    const httpRequest = {
      query: {},
    };

    expect(() =>
      findBookByNameOrIsbnController({
        findBookByNameOrISBNUseCase,
        httpRequest,
      })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
