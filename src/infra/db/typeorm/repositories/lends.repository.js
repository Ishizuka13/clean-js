const { IsNull } = require("typeorm");
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
      { data_devolucao }
    );

    const { data_retorno } = await typeormLendsRepository.findOneBy({
      id: emprestimo_id,
    });

    return { data_retorno };
  };

  const findPendings = async function () {
    const pendingLends = await typeormLendsRepository.find({
      where: {
        data_devolucao: IsNull(),
      },
      relations: ["usuario", "livro"],
      select: {
        id: true,
        data_saida: true,
        data_retorno: true,
        usuario: {
          nome_completo: true,
          CPF: true,
        },
        livro: {
          nome: true,
        },
      },
    });

    return pendingLends;
  };

  const isBookISBNLendPendingUser = async function ({ usuario_id, livro_id }) {
    const lendBook = await typeormLendsRepository.count({
      where: {
        data_devolucao: IsNull(),
        livro_id,
        usuario_id,
      },
    });

    return lendBook === 0 ? false : true;
  };

  const findPendingsByUserId = async function (emprestimo_id) {
    const lend = await typeormLendsRepository.findOne({
      where: {
        id: emprestimo_id,
      },
      relations: ["usuario", "livro"],
      select: {
        id: true,
        data_saida: true,
        data_retorno: true,
        usuario: {
          nome_completo: true,
          CPF: true,
          email: true,
        },
        livro: {
          nome: true,
        },
      },
    });

    return lend;
  };

  return {
    lend,
    returnedBook,
    findPendings,
    isBookISBNLendPendingUser,
    findPendingsByUserId,
  };
};

module.exports = { lendsRepository, typeormLendsRepository };
