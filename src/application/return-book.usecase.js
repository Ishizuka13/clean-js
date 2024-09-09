const { Either, AppError } = require("../shared/errors");

module.exports = function returnBookUseCase({ lendsRepository }) {
  if (!lendsRepository) throw new AppError(AppError.dependencies);

  return async function ({ emprestimo_id, data_devolucao }) {
    const checkedInputs = emprestimo_id && data_devolucao;
    if (!checkedInputs) throw new AppError(AppError.requiredParams);

    const { data_retorno } = await lendsRepository.return({
      emprestimo_id,
      data_devolucao,
    });

    const verifyReturn =
      new Date(data_retorno).getTime() < new Date(data_devolucao).getTime();
    const verifyFines = verifyReturn
      ? "Multa por atraso: R$10,00"
      : "Multa por atraso: R$0";

    return Either.Right(verifyFines);
  };
};
