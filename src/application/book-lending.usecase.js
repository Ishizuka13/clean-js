const { AppError, Either } = require("../shared/errors");

module.exports = function lendBookUseCase({ lendsRepository }) {
  if (!lendsRepository) throw new AppError(AppError.dependencies);
  return async function ({ usuario_id, livro_id, data_retorno, data_saida }) {
    const checkedInputs = usuario_id && livro_id && data_retorno && data_saida;
    if (!checkedInputs) throw new AppError(AppError.requiredParams);
    if (data_saida.getTime() > data_retorno.getTime())
      return Either.Left(Either.ReturnDateLowerThanQuitDate);
    const existsPendentUserLendedBookISBN =
      await lendsRepository.existsPendentUserLendedBookISBN({
        usuario_id,
        livro_id,
      });

    if (existsPendentUserLendedBookISBN)
      return Either.Left(Either.bookWithISBNIsPendentByUser);
    await lendsRepository.lend({
      usuario_id,
      livro_id,
      data_retorno,
      data_saida,
    });
    return Either.Right(null);
  };
};
