const { ZodError } = require("zod");
const { Either, AppError } = require("../../shared/errors");
const httpResponse = require("../../shared/helpers/http.response");
const findUserByCpfController = require("./find-user-by-cpf.controller");

describe("Find user by CPF", function () {
  const findUserByCPFUseCase = jest.fn();

  test("Must return a httpResponse 200 and an user if find", async function () {
    const userDTO = {
      id: "qualquer_id",
      nome_completo: "qualquer_nome",
      CPF: "123.123.123-12",
      endereco: "qualquer_endereco",
      telefone: "qualquer_telefone",
      email: "qualquer_email",
    };

    findUserByCPFUseCase.mockResolvedValue(Either.Right(userDTO));

    const httpRequest = {
      params: {
        CPF: "123.123.123-12",
      },
    };

    const response = await findUserByCpfController({
      findUserByCPFUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(200, userDTO));
    expect(findUserByCPFUseCase).toHaveBeenCalledWith(httpRequest.params);
    expect(findUserByCPFUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a httpResponse 200 and null if user not found", async function () {
    findUserByCPFUseCase.mockResolvedValue(Either.Right(null));

    const httpRequest = {
      params: {
        CPF: "123.123.123-12",
      },
    };

    const response = await findUserByCpfController({
      findUserByCPFUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(200, null));
    expect(findUserByCPFUseCase).toHaveBeenCalledWith(httpRequest.params);
    expect(findUserByCPFUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if the required params are not provided", async function () {
    expect(() => findUserByCpfController({})).rejects.toThrow(
      new AppError(AppError.requiredParams)
    );
  });

  test("Must return a zodValidator error if the required inputs are not provided", async function () {
    const httpRequest = {
      params: {},
    };

    expect(() =>
      findUserByCpfController({ findUserByCPFUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
