const { ZodError } = require("zod");
const { Either, AppError } = require("../../../../shared/errors");
const httpResponse = require("../../../../shared/helpers/http.response");
const lendBookController = require(".");

describe("lend Book Controller", function () {
  const lendBookUseCase = jest.fn();

  test("Must return a httpResponse 200 and null if success on register", async function () {
    lendBookUseCase.mockResolvedValue(Either.Right(null));

    const httpRequest = {
      body: {
        livro_id: 1,
        usuario_id: 1,
        data_saida: "2024-02-03",
        data_retorno: "2024-02-15",
      },
    };

    const response = await lendBookController({
      lendBookUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(lendBookUseCase).toHaveBeenCalledWith({
      livro_id: 1,
      usuario_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date),
    });
    expect(lendBookUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a httpResponse 400 and error message if not success on register", async function () {
    lendBookUseCase.mockResolvedValue(
      Either.Left({ message: "validacao_invalida" })
    );

    const httpRequest = {
      body: {
        livro_id: 1,
        usuario_id: 1,
        data_saida: "2024-02-03",
        data_retorno: "2024-02-15",
      },
    };

    const response = await lendBookController({
      lendBookUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(400, "validacao_invalida"));
    expect(lendBookUseCase).toHaveBeenCalledWith({
      livro_id: 1,
      usuario_id: 1,
      data_saida: expect.any(Date),
      data_retorno: expect.any(Date),
    });
    expect(lendBookUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if required params are not provided", async function () {
    expect(() => lendBookController({})).rejects.toThrow(
      new AppError(AppError.dependencies)
    );
  });

  test("Must return a throw ZodValidator error if error on validation of required data", async function () {
    const httpRequest = {
      body: {},
    };

    expect(() =>
      lendBookController({ lendBookUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
