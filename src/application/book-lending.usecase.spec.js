const lendBookUseCase = require("./book-lending.usecase");

describe("Lend book UseCase", function () {
  const lendsRepository = {
    lend: jest.fn(),
    existsPendentUserLendedBookISBN: jest.fn(),
  };

  test("Must be able to lend a book", async function () {
    const lendDTO = {
      livro_id: "qualquer_livro_id",
      usuario_id: "qualquer_usuario_id",
      data_saida: new Date("2024-02-16"),
      data_retorno: new Date("2024-02-16"),
    };

    const sut = lendBookUseCase({ lendsRepository });
    const output = await sut(lendDTO);

    expect(output.right).toBeNull();
    expect(lendsRepository.lend).toHaveBeenCalledWith(lendDTO);
    expect(lendsRepository.lend).toHaveBeenCalledTimes(1);
  });
});
