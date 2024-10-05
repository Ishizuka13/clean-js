const { z } = require("zod");
const httpResponse = require("../../shared/helpers/http.response");
const { AppError } = require("../../shared/errors");

const zodValidator = z.object({
  nome: z.string({
    required_error: "Nome é obrigatório",
  }),
  quantidade: z.number({
    required_error: "Quantidade é obrigatório",
  }),
  autor: z.string({
    required_error: "Autor é obrigatório",
  }),
  genero: z.string({
    required_error: "Gênero é obrigatório",
  }),
  ISBN: z.string({
    required_error: "ISBN é obrigatório",
  }),
});

module.exports = async function registerBookController({
  registerBookUseCase,
  httpRequest,
}) {
  const bodyCheck = !registerBookUseCase || !httpRequest || !httpRequest.body;

  if (bodyCheck) throw new AppError(AppError.dependencies);

  const { nome, quantidade, autor, genero, ISBN } = zodValidator.parse(
    httpRequest.body
  );

  const output = await registerBookUseCase({
    nome,
    quantidade,
    autor,
    genero,
    ISBN,
  });

  return output.fold(
    (err) => httpResponse(400, err.message),
    () => httpResponse(201, null)
  );
};
