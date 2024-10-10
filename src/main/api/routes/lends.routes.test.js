const request = require("supertest");
const { app } = require("../app");
const {
  typeormBooksRepository,
} = require("../../../infra/db/typeorm/repositories/books.repository");
const {
  typeormUsersRepository,
} = require("../../../infra/db/typeorm/repositories/users.repository");
const {
  typeormLendsRepository,
} = require("../../../infra/db/typeorm/repositories/lends.repository");

describe("Lends Route", function () {
  beforeEach(async function () {
    await typeormLendsRepository.query("DELETE FROM emprestimos");
    await typeormBooksRepository.query("DELETE FROM livros");
    await typeormUsersRepository.query("DELETE FROM usuarios");
  });

  const bookDTO = {
    nome: "qualquer_nome",
    quantidade: 2,
    autor: "qualquer_autor",
    genero: "qualquer_genero",
    ISBN: "qualquer_ISBN",
  };
  const userDTO = {
    nome_completo: "qualquer_nome",
    CPF: "123.123.123-12",
    endereco: "qualquer_endereco",
    telefone: "qualquer_telefone",
    email: "qualquer_email@mail.com",
  };

  test("Must be able to lend a book", async function () {
    const book = await typeormBooksRepository.save(bookDTO);

    const user = await typeormUsersRepository.save(userDTO);

    const { statusCode, body } = await request(app).post("/lend").send({
      livro_id: book.id,
      usuario_id: user.id,
      data_saida: "2024-03-01",
      data_retorno: "2024-03-02",
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });

  test("Must return 200 and message of fine not applied", async function () {
    const book = await typeormBooksRepository.save(bookDTO);

    const user = await typeormUsersRepository.save(userDTO);

    const lend = await typeormLendsRepository.save({
      livro_id: book.id,
      usuario_id: user.id,
      data_saida: "2024-03-01",
      data_retorno: "2024-03-02",
    });

    const { statusCode, body } = await request(app)
      .put(`/lend/return/${lend.id}`)
      .send({
        data_devolucao: "2024-02-16",
      });

    expect(statusCode).toBe(200);
    expect(body).toBe("Multa por atraso: R$ 0");
  });

  test("Must return 200 and message of fine applied", async function () {
    const book = await typeormBooksRepository.save(bookDTO);

    const user = await typeormUsersRepository.save(userDTO);

    const lend = await typeormLendsRepository.save({
      livro_id: book.id,
      usuario_id: user.id,
      data_saida: "2024-03-01",
      data_retorno: "2024-03-02",
    });

    const { statusCode, body } = await request(app)
      .put(`/lend/return/${lend.id}`)
      .send({
        data_devolucao: "2024-03-03",
      });

    expect(statusCode).toBe(200);
    expect(body).toBe("Multa por atraso: R$ 10,00");
  });

  test("Must return an error if required input is not provided", async function () {
    const { statusCode, body } = await request(app)
      .put(`/lend/return/3`)
      .send();

    expect(statusCode).toBe(400);
    expect(body.errors.fieldErrors).toEqual({
      data_devolucao: ["Data de devolução é obrigatória"],
    });
  });

  test("Must return the pending lends", async function () {
    const user = await typeormUsersRepository.save(userDTO);
    const book = await typeormBooksRepository.save(bookDTO);
    await typeormLendsRepository.save([
      {
        livro_id: book.id,
        usuario_id: user.id,
        data_saida: "2024-03-01",
        data_retorno: "2024-03-02",
        data_devolucao: "2024-03-02",
      },
      {
        livro_id: book.id,
        usuario_id: user.id,
        data_saida: "2024-03-01",
        data_retorno: "2024-03-02",
      },
    ]);

    const { statusCode, body } = await request(app).get("/lend");

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0].data_retorno).toBe("2024-03-02");
    expect(body[0].data_saida).toBe("2024-03-01");
    expect(body[0].usuario.nome_completo).toBe(user.nome_completo);
    expect(body[0].livro.nome).toBe(book.nome);
  });
});
