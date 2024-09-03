const searchUserByCpfUsecase = require("./search-user-by-cpf.usecase");

describe("Search user by CPF UseCase", function () {
  const usersRepository = {
    searchByCPF: jest.fn(),
  };

  test("Must return a user when CPF is registered", async function () {
    const cpfDTO = -{
      CPF: "CPF_cadastrado",
    };

    const outputDTO = {
      id: "qualquer_ID",
      name: "qualquer_nome",
      CPF: "CPF_cadastrado",
      telefone: "qualquer_telefone",
      email: "qualquer_email",
    };

    usersRepository.searchByCPF.mockResolvedValue(outputDTO);

    const sut = searchUserByCpfUsecase({ usersRepository });
    const output = await sut(cpfDTO);

    expect(output.right).toEqual(outputDTO);
    expect(usersRepository.searchByCPF).toHaveBeenCalledWith(cpfDTO.cpf);
    expect(usersRepository.searchByCPF).toHaveBeenCalledTimes(1);
  });
});
