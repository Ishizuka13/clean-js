const { Either } = require("../shared/errors");
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

  test("Must return an Either.left if return_date is lower than quit_date", async function () {
    const lendDTO = {
      livro_id: "qualquer_livro_id",
      usuario_id: "qualquer_usuario_id",
      data_saida: new Date("2024-02-16"),
      data_retorno: new Date("2024-02-15"),
    };

    const sut = lendBookUseCase({ lendsRepository });
    const output = await sut(lendDTO);

    expect(output.left).toBe(Either.ReturnDateLowerThanQuitDate);
    // expect(lendsRepository.lend).toHaveBeenCalledWith(lendDTO);
    // expect(lendsRepository.lend).toHaveBeenCalledTimes(1);
  });

  test("Must not allow the lending of a book with the same ISBN to the same user before the book has been returned", async function () {
    lendsRepository.existsPendentUserLendedBookISBN.mockResolvedValue(true);
    const lendDTO = {
      livro_id: "qualquer_livro_id",
      usuario_id: "qualquer_usuario_id",
      data_saida: new Date("2024-02-16"),
      data_retorno: new Date("2024-02-16"),
    };

    const sut = lendBookUseCase({ lendsRepository });
    const output = await sut(lendDTO);

    expect(output.left).toBe(Either.bookWithISBNIsPendentByUser);
    expect(
      lendsRepository.existsPendentUserLendedBookISBN
    ).toHaveBeenCalledWith({
      livro_id: lendDTO.livro_id,
      usuario_id: lendDTO.usuario_id,
    });
    expect(
      lendsRepository.existsPendentUserLendedBookISBN
    ).toHaveBeenCalledTimes(1);
  });
});
