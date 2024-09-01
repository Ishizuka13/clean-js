module.exports = function userRegisterUseCase() {
  return async function ({ nome_completo, CPF, telefone, endereco, email }) {
    await userRepository.register({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email,
    });
  };
};
