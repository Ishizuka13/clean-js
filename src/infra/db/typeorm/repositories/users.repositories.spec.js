const {
  usersRepository,
  typeormUsersRepository,
} = require("./users.repositories");

describe("Users Repository", function () {
  beforeEach(async function () {
    await typeormUsersRepository.delete({});
  });

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

  test("Must return a user when existing", async function () {
    await typeormUsersRepository.save({
      nome_completo: "nome_valido",
      CPF: "CPF_valido",
      telefone: "telefone_valido",
      email: "email_valido",
      endereco: "endereco_valido",
    });

    const sut = usersRepository();
    const findByRegisteredCPF = await sut.findByCPF("CPF_valido");

    expect(findByRegisteredCPF).toBeDefined();
    expect(findByRegisteredCPF.nome_completo).toBe("nome_valido");
  });

  test("Must return null if user with CPF does not exist", async function () {
    const sut = usersRepository();
    const findByRegisteredCPF = await sut.findByCPF("CPF-nao_cadastro");

    expect(findByRegisteredCPF).toBeNull();
  });
});
