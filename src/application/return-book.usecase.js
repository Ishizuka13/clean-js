const { Either } = require("../shared/errors");

module.exports = function returnBookUseCase({ lendsRepository }) {
  return async function ({ emprestimo_id, data_devolucao }) {
    await lendsRepository.return({
      emprestimo_id,
      data_devolucao,
    });

    const verifyFines = "Multa por atraso: R$0";
    return Either.Right(verifyFines);
  };
};
