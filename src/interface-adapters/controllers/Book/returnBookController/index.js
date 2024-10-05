const { z } = require("zod");
const httpResponse = require("../../../../shared/helpers/http.response");
const { AppError } = require("../../../../shared/errors");

const zodValidatorBody = z.object({
  data_devolucao: z.string({
    required_error: "Data de devolução é obrigatória",
  }),
});
module.exports = async function returnBookController({
  returnBookUseCase,
  httpRequest,
}) {
  const paramsCheck =
    !returnBookUseCase ||
    !httpRequest ||
    !httpRequest.params ||
    !httpRequest.body;

  if (paramsCheck) throw new AppError(AppError.dependencies);

  const { data_devolucao } = zodValidatorBody.parse(httpRequest.body);

  const { emprestimo_id } = httpRequest.params;

  const output = await returnBookUseCase({
    emprestimo_id,
    data_devolucao,
  });

  return output.fold(
    (err) => httpResponse(400, err.message),
    (result) => httpResponse(200, result)
  );
};
