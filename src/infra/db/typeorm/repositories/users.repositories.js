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

  const findByCPF = async function (CPF) {
    const user = await typeormUsersRepository.findOne({
      where: {
        CPF,
      },
    });

    return user;
  };

  return { register, findByCPF };
};

module.exports = { usersRepository, typeormUsersRepository };
