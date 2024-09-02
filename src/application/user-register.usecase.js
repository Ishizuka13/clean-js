const AppError = require("../shared/errors/AppError");

module.exports = function userRegisterUseCase({ usersRepository }) {
  if (!usersRepository) throw new AppError(AppError.dependencies);

  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    const checkedInputs = nome_completo && CPF && telefone && endereco && email;

    if (!checkedInputs) throw new AppError(AppError.requiredParams);
    await usersRepository.register({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email,
    });
  };
};
