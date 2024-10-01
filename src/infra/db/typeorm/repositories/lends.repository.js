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

  const returnedBook = async function ({ emprestimo_id, data_devolucao }) {
    await typeormLendsRepository.update(
      { id: emprestimo_id },
      {
        data_devolucao,
      }
    );

    const { data_retorno } = await typeormLendsRepository.findOneBy({
      id: emprestimo_id,
    });

    return { data_retorno };
  };

  return { lend, returnedBook };
};

module.exports = { lendsRepository, typeormLendsRepository };
