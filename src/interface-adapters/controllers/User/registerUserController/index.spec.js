const { ZodError } = require("zod");
const { Either, AppError } = require("../../../../shared/errors");
const httpResponse = require("../../../../shared/helpers/http.response");
const userRegisterController = require("./index.js");

describe("User register controller", function () {
  const userRegisterUseCase = jest.fn();

  test("Must return a httpResponse 201 and null if success", async function () {
    userRegisterUseCase.mockResolvedValue(Either.Right(null));

    const httpRequest = {
      body: {
        nome_completo: "qualquer_nome_completo",
        CPF: "123.123.123-12",
        endereco: "qualquer_endereco",
        telefone: "qualquer_telefone",
        email: "qualquer_email@gmail.com",
      },
    };

    const response = await userRegisterController({
      userRegisterUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(201, null));
    expect(userRegisterUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(userRegisterUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if the required params are not provided", async function () {
    expect(() => userRegisterController({})).rejects.toThrow(
      new AppError(AppError.requiredParams)
    );
  });

  test("Must return a httpResponse 400 and error.message if register of user is not done properly following the usecase's logic", async function () {
    userRegisterUseCase.mockResolvedValue(
      Either.Left({ message: "logica_invalida" })
    );

    const httpRequest = {
      body: {
        nome_completo: "qualquer_nome_completo",
        CPF: "123.123.123-12",
        endereco: "qualquer_endereco",
        telefone: "qualquer_telefone",
        email: "qualquer_email@gmail.com",
      },
    };

    const response = await userRegisterController({
      userRegisterUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(400, "logica_invalida"));
    expect(userRegisterUseCase).toHaveBeenCalledWith(httpRequest.body);
    expect(userRegisterUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a zod error if received validation Error", async function () {
    const httpRequest = {
      body: {},
    };

    expect(() =>
      userRegisterController({ userRegisterUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
