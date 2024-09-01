module.exports = function userRegisterUseCase({ usersRepository }) {
  if (!usersRepository) throw new Error("userRepository not found");

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
