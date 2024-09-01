const AppError = require("../shared/errors/AppError");

module.exports = function userRegisterUseCase({ usersRepository }) {
  if (!usersRepository) throw new AppError(AppError.dependencies);

  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    await usersRepository.register({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email,
    });
  };
};
