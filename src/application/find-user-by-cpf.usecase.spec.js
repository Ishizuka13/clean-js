const { AppError } = require("../shared/errors");
const findUserByCPFUsecase = require("./find-user-by-cpf.usecase");

describe("Search user by CPF UseCase", function () {
  const usersRepository = {
    searchByCPF: jest.fn(),
  };

  test("Must return a user when CPF is registered", async function () {
    const cpfDTO = {
      CPF: "CPF_cadastrado",
    };

    const outputDTO = {
      id: "qualquer_ID",
      nome: "qualquer_nome",
      CPF: "CPF_cadastrado",
      telefone: "qualquer_telefone",
      email: "qualquer_email",
    };

    usersRepository.searchByCPF.mockResolvedValue(outputDTO);

    const sut = findUserByCPFUsecase({ usersRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toEqual(outputDTO);
    expect(usersRepository.searchByCPF).toHaveBeenCalledWith(cpfDTO.CPF);
    expect(usersRepository.searchByCPF).toHaveBeenCalledTimes(1);
  });

  test("Must return null if there is no CPF registered", async function () {
    usersRepository.searchByCPF.mockResolvedValue(null);
    const cpfDTO = {
      CPF: "CPF_nao_cadastrado",
    };

    const sut = findUserByCPFUsecase({ usersRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toBeNull();
    expect(usersRepository.searchByCPF).toHaveBeenCalledWith(cpfDTO.CPF);
    expect(usersRepository.searchByCPF).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if usersRepository is not provided", async function () {
    expect(() => findUserByCPFUsecase({})).toThrow(
      new AppError(AppError.dependencies)
    );
  });

  test("Must return a throw AppError if CPF input is not provided", async function () {
    const sut = findUserByCPFUsecase({ usersRepository });

    expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.requiredParams)
    );
  });
});
