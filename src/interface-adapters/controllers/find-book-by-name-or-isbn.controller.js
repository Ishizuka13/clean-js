const { z } = require("zod");
const httpResponse = require("../../shared/helpers/http.response");
const { AppError } = require("../../shared/errors");

const zodValidator = z.object({
  valor: z.string({
    required_error: "Valor é obrigatório",
  }),
});

module.exports = async function findBookByNameOrISBNController({
  findBookByNameOrISBNUseCase,
  httpRequest,
}) {
  const queryCheck =
    !findBookByNameOrISBNUseCase || !httpRequest || !httpRequest.query;

  if (queryCheck) throw new AppError(AppError.dependencies);

  const { valor } = zodValidator.parse(httpRequest.query);

  const output = await findBookByNameOrISBNUseCase({ valor });

  return output.fold(
    (err) => httpResponse(400, err.message),
    (books) => httpResponse(200, books)
  );
};
