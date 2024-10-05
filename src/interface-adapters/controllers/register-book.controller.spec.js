const { ZodError } = require("zod");
const { Either, AppError } = require("../../shared/errors");
const httpResponse = require("../../shared/helpers/http.response");
const registerBookController = require("./register-book.controller");

describe("Register Book Controller", function () {
  const registerBookUseCase = jest.fn();

  test("Must return a httpResponse 201 and null if success on register", async function () {
    registerBookUseCase.mockResolvedValue(Either.Right(null));

    const httpRequest = {
      body: {
        nome: "qualquer_nome",
        quantidade: 1,
        autor: "qualquer_autor",
        genero: "qualquer_genero",
        ISBN: "qualquer_ISBN",
      },
    };

    const response = await registerBookController({
      registerBookUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(registerBookUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(registerBookUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a httpResponse 400 and message if not success on register ", async function () {
    registerBookUseCase.mockResolvedValue(
      Either.Left({ message: "validacao_invalida" })
    );

    const httpRequest = {
      body: {
        nome: "qualquer_nome",
        quantidade: 1,
        autor: "qualquer_autor",
        genero: "qualquer_genero",
        ISBN: "qualquer_ISBN",
      },
    };

    const response = await registerBookController({
      registerBookUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(400, "validacao_invalida"));
    expect(registerBookUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(registerBookUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if the required params are not provided", async function () {
    expect(() => registerBookController({})).rejects.toThrow(
      new AppError(AppError.dependencies)
    );
  });

  test("Must return a ZodValidator error if error on validation of required data", async function () {
    const httpRequest = {
      body: {},
    };

    expect(() =>
      registerBookController({ registerBookUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
