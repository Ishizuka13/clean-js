module.exports = function userRegisterUseCase({ usersRepository }) {
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
