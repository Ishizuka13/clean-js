const { sendMailQueue } = require("../infra/queue/bull");
const { AppError, Either } = require("../shared/errors");

module.exports = function lendBookUseCase({ lendsRepository, emailService }) {
  if (!lendsRepository || !emailService)
    throw new AppError(AppError.dependencies);

  return async function ({ usuario_id, livro_id, data_retorno, data_saida }) {
    const checkedInputs = usuario_id && livro_id && data_retorno && data_saida;
    if (!checkedInputs) throw new AppError(AppError.requiredParams);

    if (data_saida.getTime() > data_retorno.getTime())
      return Either.Left(Either.ReturnDateLowerThanQuitDate);

    const isBookISBNLendPendingUser =
      await lendsRepository.isBookISBNLendPendingUser({
        usuario_id,
        livro_id,
      });

    if (isBookISBNLendPendingUser === true)
      return Either.Left(Either.bookWithISBNIsPendentByUser);
    const id = await lendsRepository.lend({
      usuario_id,
      livro_id,
      data_retorno,
      data_saida,
    });

    const { usuario, livro } = await lendsRepository.findPendingsByUserId(id);

    await sendMailQueue.add({
      data_saida: data_saida.toLocaleDateString("pt-BR"),
      data_retorno: data_retorno.toLocaleDateString("pt-BR"),
      usuario,
      livro,
    });
    return Either.Right(null);
  };
};
