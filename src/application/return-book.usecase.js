const lendEntity = require("../enterprise/entities/lend.entity");
const { Either, AppError } = require("../shared/errors");

module.exports = function returnBookUseCase({ lendsRepository }) {
  if (!lendsRepository) throw new AppError(AppError.dependencies);

  return async function ({ emprestimo_id, data_devolucao }) {
    const checkedInputs = emprestimo_id && data_devolucao;
    if (!checkedInputs) throw new AppError(AppError.requiredParams);

    const { data_retorno } = await lendsRepository.returnedBook({
      emprestimo_id,
      data_devolucao,
    });

    const calculateFine = lendEntity.calculateFine({
      data_retorno,
      data_devolucao,
    });

    return Either.Right(calculateFine);
  };
};
