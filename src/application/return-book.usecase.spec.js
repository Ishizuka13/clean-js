const returnBookUsecase = require("./return-book.usecase");

describe("Return book UseCase", function () {
  const lendsRepository = {
    return: jest.fn(),
  };

  test("Must be able to return a book without fines", async function () {
    const returnBookDTO = {
      emprestimo_id: "qualquer_id",
      data_devolucao: new Date("2024-02-16"),
    };

    const sut = returnBookUsecase({ lendsRepository });
    const output = await sut(returnBookDTO);

    expect(output.right).toBe("Multa por atraso: R$0");
    expect(lendsRepository.return).toHaveBeenCalledWith(returnBookDTO);
    expect(lendsRepository.return).toHaveBeenCalledTimes(1);
  });
});
