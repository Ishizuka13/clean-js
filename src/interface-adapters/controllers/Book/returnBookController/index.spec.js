const { ZodError } = require("zod");
const AppError = require("../../../../shared/errors/AppError.js");
const Either = require("../../../../shared/errors/Either.js");
const httpResponse = require("../../../../shared/helpers/http.response.js");
const returnBookController = require("./index.js");

describe("return Book  Controller", function () {
  const returnBookUseCase = jest.fn();

  test("Must return a httpResponse 200 and result if success on return", async function () {
    returnBookUseCase.mockResolvedValue(Either.Right("Multa por atraso: R$ 0"));

    const httpRequest = {
      body: {
        data_devolucao: "2024-03-03",
      },
      params: {
        emprestimo_id: "1",
      },
    };

    const response = await returnBookController({
      returnBookUseCase,
      httpRequest,
    });

    expect(response).toEqual(httpResponse(200, "Multa por atraso: R$ 0"));
    expect(returnBookUseCase).toHaveBeenCalledWith({
      ...httpRequest.body,
      ...httpRequest.params,
    });
    expect(returnBookUseCase).toHaveBeenCalledTimes(1);
  });

  test("Must return an error if the required params are not provided", async function () {
    expect(() => returnBookController({})).rejects.toThrow(
      new AppError(AppError.dependencies)
    );
  });

  test("Must return a ZodValidator error if a required data is not provided", async function () {
    const httpRequest = {
      body: {},
      params: {
        emprestimo_id: "1",
      },
    };

    expect(() =>
      returnBookController({ returnBookUseCase, httpRequest })
    ).rejects.toBeInstanceOf(ZodError);
  });
});
