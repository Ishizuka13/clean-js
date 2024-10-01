const { typeormServer } = require("../setup");

const typeormLendsRepository = typeormServer.getRepository("Emprestimo");

const lendsRepository = function () {
  const lend = async function ({
    usuario_id,
    livro_id,
    data_retorno,
    data_saida,
  }) {
    await typeormLendsRepository.save({
      usuario_id,
      livro_id,
      data_retorno,
      data_saida,
    });
  };

  return { lend };
};

module.exports = { lendsRepository, typeormLendsRepository };
