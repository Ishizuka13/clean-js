const { typeormBooksRepository } = require("./books.repository");
const { lendsRepository } = require("./lends.repository");
const { typeormUsersRepository } = require("./users.repository");

describe("Lends Repository Typeorm", function () {
  let sut;

  beforeAll(function () {
    sut = lendsRepository();
  });

  test("Must return void when created the lend", async function () {
    const user = await typeormUsersRepository.save({
      nome_completo: "qualquer_nome",
      CPF: "qualquer_CPF",
      telefone: "qualquer_telefone",
      email: "qualquer_email",
      endereco: "qualquer_endereco",
    });

    const book = await typeormBooksRepository.save({
      nome: "qualquer_nome",
      quantidade: 3,
      autor: "qulaquer_autor",
      genero: "qulaquer_genero",
      ISBN: "qulaquer_ISBN",
    });

    const lendBook = await sut.lend({
      usuario_id: user.id,
      livro_id: book.id,
      data_retorno: "2024-01-27",
      data_saida: "2024-01-26",
    });

    expect(lendBook).toBeUndefined();
  });
});
