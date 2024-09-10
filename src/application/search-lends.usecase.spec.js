const { AppError } = require("../shared/errors");
const searchLendsUseCase = require("./search-lends.usecase");

describe("Search Pending Lends UseCase", function () {
  const lendsRepository = {
    searchPendingsWithBookAndUser: jest.fn(),
  };

  test("Must be able to search the pending lends", async function () {
    lendsRepository.searchPendingsWithBookAndUser.mockResolvedValue([
      {
        usuario: {
          nome: "qualquer_nome_usuario",
          CPF: "qualquer_cpf",
        },
        livro: {
          nome: "qualquer_nome_livro",
        },
        data_saida: "2024-10-01",
        data_retorno: "2024-10-02",
      },
      {
        usuario: {
          nome: "qualquer_nome_valido",
          CPF: "qualquer_cpf_valido",
        },
        livro: {
          nome: "qualquer_nome_livro_valido",
        },
        data_saida: "2024-11-10",
        data_retorno: "2024-11-15",
      },
    ]);

    const sut = searchLendsUseCase({ lendsRepository });
    const output = await sut();

    expect(output.right).toHaveLength(2);
    expect(output.right[0].usuario.nome).toBe("qualquer_nome_usuario");
    expect(output.right[0].usuario.CPF).toBe("qualquer_cpf");
    expect(output.right[0].livro.nome).toBe("qualquer_nome_livro");
    expect(output.right[0].data_saida).toBe("2024-10-01");
    expect(output.right[0].data_retorno).toBe("2024-10-02");
  });

  test("Must return a throw AppError if the lendsRepository is not provided", function () {
    expect(() => searchLendsUseCase({})).toThrow(
      new AppError(AppError.dependencies)
    );
  });
});
