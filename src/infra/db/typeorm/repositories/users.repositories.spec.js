const { usersRepository } = require("./users.repositories");

describe("Users Repository", function () {
  test("Must return void at the creation of an user", async function () {
    const sut = usersRepository();
    const userCreated = await sut.register({
      nome_completo: "nome_valido",
      CPF: "CPF_valido",
      telefone: "telefone_valido",
      email: "email_valido",
      endereco: "endereco_valido",
    });
    expect(userCreated).toBeUndefined();
  });
});
