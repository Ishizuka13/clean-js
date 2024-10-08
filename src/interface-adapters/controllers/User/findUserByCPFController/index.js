const { z } = require("zod");
const httpResponse = require("../../../../shared/helpers/http.response");
const { AppError } = require("../../../../shared/errors");

const zodValidator = z.object({
  CPF: z
    .string({
      required_error: "CPF é obrigatório",
    })
    .refine(
      (value) => /^([0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2})$/.test(value),
      {
        message: "CPF inválido",
      }
    ),
});

module.exports = async function findUserByCPF({
  findUserByCPFUseCase,
  httpRequest,
}) {
  const paramsCheck =
    !findUserByCPFUseCase || !httpRequest || !httpRequest.params;

  if (paramsCheck) throw new AppError(AppError.requiredParams);

  const { CPF } = zodValidator.parse(httpRequest.params);
  const output = await findUserByCPFUseCase({ CPF });

  return output.fold(
    (err) => httpResponse(400, err.message),
    (user) => httpResponse(200, user)
  );
};
