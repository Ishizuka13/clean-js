const { typeormServer } = require("../setup");

const typeormUsersRepository = typeormServer.getRepository("Usuario");

const usersRepository = function () {
  const register = async function ({
    nome_completo,
    CPF,
    telefone,
    endereco,
    email,
  }) {
    await typeormUsersRepository.save({
      nome_completo,
      CPF,
      telefone,
      endereco,
      email,
    });
  };
  return { register };
};

module.exports = { usersRepository, typeormUsersRepository };
