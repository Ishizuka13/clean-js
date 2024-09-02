const AppError = require("../shared/errors/AppError.js");
const userRegisterUsecase = require("./user-register.usecase.js");
const registerUserUseCase = require("./user-register.usecase.js");

describe("Register user UseCase", function () {
  const usersRepository = {
    register: jest.fn(),
    foundCPF: jest.fn(),
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
    expect(() => registerUserUseCase({})).toThrow(
      new AppError(AppError.dependencies)
    );
  });
  test("Must return a throw AppError if the required inputs are not provided", async function () {
    const sut = userRegisterUsecase({ usersRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.requiredParams)
    );
  });

  test("Must return a throw AppErro if already exists a register of the CPF", function () {
    usersRepository.foundCPF.mockResolvedValue(true);
    const userDTO = {
      nome_completo: "nome_valido",
      CPF: "CPF_ja_cadastrado",
      telefone: "telefone_valido",
      endereco: "endereco_valido",
      email: "email_valido",
    };

    const sut = userRegisterUsecase({ usersRepository });
    expect(() => sut(userDTO)).rejects.toThrow(
      new AppError("CPF already registered")
    );
  });
});
