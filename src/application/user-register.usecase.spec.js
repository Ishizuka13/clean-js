const registerUserUseCase = require("./user-register.usecase.js");

describe("Register user UseCase", function () {
  const usersRepository = {
    register: jest.fn(),
  };

  test("Must register a user", async function () {
    const userDTO = {
      nome_completo: "nome_valido",
      CPF: "CPF_valido",
      telefone: "telefone_valido",
      endereco: "endereco_valido",
      email: "email_valido",
    };
    const sut = registerUserUseCase({ usersRepository });
    const output = await sut(userDTO);

    expect(output).toBeUndefined();
    expect(usersRepository.register).toHaveBeenCalledWith(userDTO);
    expect(usersRepository.register).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if the userRepository is not provided", function () {
    expect(() => registerUserUseCase({})).toThrow("userRepository not found");
  });
});
