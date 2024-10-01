const { AppError } = require("../../shared/errors");
const httpResponse = require("../../shared/helpers/http.response");

const { z } = require("zod");

const zodValidator = z.object({
  nome_completo: z.string({
    required_error: "Nome Completo é obrigatório",
  }),
  CPF: z
    .string({
      required_error: "CPF é obrigatório",
    })
    .refine((value) =>
      /^([0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2})$/.test(value)
    ),
  endereco: z.string({
    required_error: "Endereço é obrigatório",
  }),
  telefone: z.string({
    required_error: "Telefone é obrigatório",
  }),
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({
      message: "Email deve ser válido",
    }),
});

module.exports = async function userRegisterController({
  userRegisterUseCase,
  httpRequest,
}) {
  const dependenciesCheck = !userRegisterUseCase || !httpRequest;

  if (dependenciesCheck) throw new AppError(AppError.requiredParams);

  const { nome_completo, CPF, endereco, telefone, email } = zodValidator.parse(
    httpRequest.body
  );

  const output = await userRegisterUseCase({
    nome_completo,
    CPF,
    endereco,
    telefone,
    email,
  });

  return output.fold(
    (err) => httpResponse(400, err.message),
    () => httpResponse(201, null)
  );
};
