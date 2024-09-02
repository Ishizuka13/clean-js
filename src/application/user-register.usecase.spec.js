const AppError = require("../shared/errors/AppError.js");
const Either = require("../shared/errors/Either.js");
const userRegisterUsecase = require("./user-register.usecase.js");
const registerUserUseCase = require("./user-register.usecase.js");

describe("Register user UseCase", function () {
  const usersRepository = {
    register: jest.fn(),
    foundCPF: jest.fn(),
    foundEmail: jest.fn(),
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

    expect(output.right).toBeNull();
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

  test("Must return a Either.Left() if already exists a register of the CPF", async function () {
    usersRepository.foundCPF.mockResolvedValue(true);
    const userDTO = {
      nome_completo: "nome_valido",
      CPF: "CPF_ja_cadastrado",
      telefone: "telefone_valido",
      endereco: "endereco_valido",
      email: "email_valido",
    };

    const sut = userRegisterUsecase({ usersRepository });
    const output = await sut(userDTO);
    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueAlreadyRegistered("CPF"));
    expect(usersRepository.foundCPF).toHaveBeenCalledWith(userDTO.CPF);
    expect(usersRepository.foundCPF).toHaveBeenCalledTimes(1);
  });

  test("Must return a Either.Left if already exists an registered email", async function () {
    usersRepository.foundCPF.mockResolvedValue(false);
    usersRepository.foundEmail.mockResolvedValue(true);
    const userDTO = {
      nome_completo: "nome_valido",
      CPF: "CPF_valido",
      telefone: "telefone_valido",
      endereco: "endereco_valido",
      email: "email_ja_cadastrado",
    };

    const sut = registerUserUseCase({ usersRepository });
    const output = await sut(userDTO);

    expect(output.right).toBeNull();
    expect(output.left).toEqual(Either.valueAlreadyRegistered("Email"));
    expect(usersRepository.foundEmail).toHaveBeenCalledWith(userDTO.email);
    expect(usersRepository.foundEmail).toHaveBeenCalledTimes(1);
  });
});
