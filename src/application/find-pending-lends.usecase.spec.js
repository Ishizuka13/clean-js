const findPendings = require("../../tests/fixtures/find-pendings");
const { AppError } = require("../shared/errors");
const searchLendsUseCase = require("./find-pending-lends.usecase");

describe("Search Pending Lends UseCase", function () {
  const lendsRepository = {
    findPendings: jest.fn(),
  };

  test("Must be able to search the pending lends", async function () {
    lendsRepository.findPendings.mockResolvedValue(findPendings);

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
