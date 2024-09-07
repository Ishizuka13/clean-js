const { AppError, Either } = require("../shared/errors");

module.exports = function lendBookUseCase({ lendsRepository, emailService }) {
  if (!lendsRepository || !emailService)
    throw new AppError(AppError.dependencies);
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
    const id = await lendsRepository.lend({
      usuario_id,
      livro_id,
      data_retorno,
      data_saida,
    });

    const { usuario, livro } = await lendsRepository.findLendedBookWithUserById(
      id
    );

    await emailService.sendEmail({
      data_saida,
      data_retorno,
      nome_usuario: usuario.nome,
      CPF: usuario.CPF,
      email: usuario.email,
      nome_livro: livro.nome,
    });

    return Either.Right(null);
  };
};
