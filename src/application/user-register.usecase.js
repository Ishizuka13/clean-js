const { Either } = require("../shared/errors");
const AppError = require("../shared/errors/AppError");

module.exports = function userRegisterUseCase({ usersRepository }) {
  if (!usersRepository) throw new AppError(AppError.dependencies);

  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    const checkedInputs = nome_completo && CPF && telefone && endereco && email;

    if (!checkedInputs) throw new AppError(AppError.requiredParams);

    const checkIfTheCPFIsAlreadyRegistered = await usersRepository.foundCPF(
      CPF
    );
    if (checkIfTheCPFIsAlreadyRegistered)
      return Either.Left(Either.valueAlreadyRegistered("CPF"));

    const checkIfTheEmailIsAlreadyRegistered = await usersRepository.foundEmail(
      email
    );
    if (checkIfTheEmailIsAlreadyRegistered)
      return Either.Left(Either.valueAlreadyRegistered("Email"));
    await usersRepository.register({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email,
    });

    return Either.Right(null);
  };
};
