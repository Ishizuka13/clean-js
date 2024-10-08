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

  test("Must return an error with a the required inputs", async function () {
    const { statusCode, body } = await request(app).post("/user").send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe("Erro de validacao");
    expect(body.errors.fieldErrors).toEqual({
      nome_completo: ["Nome Completo é obrigatório"],
      CPF: ["CPF é obrigatório"],
      endereco: ["Endereço é obrigatório"],
      telefone: ["Telefone é obrigatório"],
      email: ["Email é obrigatório"],
    });
  });

  test("Must return an user when found by CPF", async function () {
    const userDTO = {
      nome_completo: "nome_valido",
      CPF: "123.123.123-12",
      endereco: "endereco_valido",
      telefone: "telefone_valido",
      email: "email_valido@email.com",
    };

    await typeormUsersRepository.save(userDTO);

    const { statusCode, body } = await request(app).get(
      `/user/cpf/${userDTO.CPF}`
    );

    expect(body.id).toBeDefined();
    expect(statusCode).toBe(200);
    expect(body).toEqual(expect.objectContaining(userDTO));
  });

  test("Must return null when user is not found by CPF", async function () {
    const { statusCode, body } = await request(app).get(
      `/user/cpf/123.123.123-12`
    );

    expect(statusCode).toBe(200);
    expect(body).toBeNull();
  });

  test("Must verify if CPF is passed correctly in params", async function () {
    const { statusCode, body } = await request(app).get(`/user/cpf/1`);

    expect(statusCode).toBe(400);
    expect(body.errors.fieldErrors).toEqual({
      CPF: ["CPF inválido"],
    });
  });
});
