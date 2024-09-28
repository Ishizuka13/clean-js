const {
  usersRepository,
  typeormUsersRepository,
} = require("./users.repository");

describe("Users Repository", function () {
  let sut;

  beforeEach(async function () {
    await typeormUsersRepository.delete({});
  });

  beforeAll(function () {
    sut = usersRepository();
  });

  const userDTO = {
    nome_completo: "nome_valido",
    CPF: "CPF_valido",
    telefone: "telefone_valido",
    email: "email_valido",
    endereco: "endereco_valido",
  };

  test("Must return void at the creation of an user", async function () {
    const userCreated = await sut.register(userDTO);
    expect(userCreated).toBeUndefined();
  });

  test("Must return a user when existing", async function () {
    await typeormUsersRepository.save(userDTO);

    const findByRegisteredCPF = await sut.findByCPF("CPF_valido");

    expect(findByRegisteredCPF).toBeDefined();
    expect(findByRegisteredCPF.nome_completo).toBe("nome_valido");
  });

  test("Must return null if user with CPF does not exist", async function () {
    const findByRegisteredCPF = await sut.findByCPF("CPF-nao_cadastro");

    expect(findByRegisteredCPF).toBeNull();
  });

  test("Must return true if user by CPF exists", async function () {
    await typeormUsersRepository.save(userDTO);

    const CPFExists = await sut.CPFExists("CPF_valido");

    expect(CPFExists).toBe(true);
  });
  test("Must return false if user by CPF does not exists", async function () {
    await typeormUsersRepository.save(userDTO);

    const CPFExists = await sut.CPFExists("CPF_invalido");

    expect(CPFExists).toBe(false);
  });
  test("Must return true if user by Email exists", async function () {
    await typeormUsersRepository.save(userDTO);

    const emailExists = await sut.emailExists("email_valido");

    expect(emailExists).toBe(true);
  });
  test("Must return false if user by Email does not exists", async function () {
    await typeormUsersRepository.save(userDTO);

    const emailExists = await sut.emailExists("email_invalido");

    expect(emailExists).toBe(false);
  });
});
