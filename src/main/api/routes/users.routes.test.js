const request = require("supertest");
const { app } = require("../app");
const {
  typeormUsersRepository,
} = require("../../../infra/db/typeorm/repositories/users.repository");

describe("Users Route", function () {
  beforeEach(async function () {
    await typeormUsersRepository.query("DELETE FROM usuarios");
  });
  test("Must be able to register user", async function () {
    const { statusCode, body } = await request(app).post("/user").send({
      nome_completo: "nome_valido",
      CPF: "123.123.123-12",
      endereco: "endereco_valido",
      telefone: "telefone_valido",
      email: "email_valido@email.com",
    });

    expect(statusCode).toBe(201);
    expect(body).toBeNull();
  });
});
