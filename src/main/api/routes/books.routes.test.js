const request = require("supertest");
const {
  typeormBooksRepository,
} = require("../../../infra/db/typeorm/repositories/books.repository");
const { app } = require("../app");

describe("Books Routes", function () {
  beforeEach(async function () {
    await typeormBooksRepository.query("DELETE FROM livros");
  });

  test("Must be able to register a book", async function () {
    const { statusCode, body } = await request(app).post("/book").send({
      nome: "qualquer_nome",
      quantidade: 1,
      autor: "qualquer_autor",
      genero: "qualquer_genero",
      ISBN: "qualquer_ISBN",
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });

  test("Must be able to find book by name", async function () {
    const bookDTO = {
      nome: "qualquer_nome",
      quantidade: 3,
      autor: "qualquer_autor",
      genero: "qualquer_genero",
      ISBN: "qualquer_ISBN",
    };

    await typeormBooksRepository.save(bookDTO);

    const { statusCode, body } = await request(app)
      .get("/book")
      .query({ valor: bookDTO.nome });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(1);
    expect(body[0]).toEqual(expect.objectContaining(bookDTO));
  });

  test("Must return an empty array when book is not found", async function () {
    const { statusCode, body } = await request(app)
      .get("/book")
      .query({ valor: "qualquer_nome" });

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(0);
  });

  test("Must return an error if the required inputs are empty when registering book", async function () {
    const { statusCode, body } = await request(app).post("/book").send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe("Erro de validacao");
    expect(body.errors.fieldErrors).toEqual({
      nome: ["Nome é obrigatório"],
      quantidade: ["Quantidade é obrigatório"],
      autor: ["Autor é obrigatório"],
      genero: ["Gênero é obrigatório"],
      ISBN: ["ISBN é obrigatório"],
    });
  });

  test("Must return an error if required value is not provided", async function () {
    const { statusCode, body } = await request(app).get("/book");

    expect(statusCode).toBe(400);
    expect(body.message).toBe("Erro de validacao");
    expect(body.errors.fieldErrors).toEqual({ valor: ["Valor é obrigatório"] });
  });
});
