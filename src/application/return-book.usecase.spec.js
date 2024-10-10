const { AppError } = require("../shared/errors");
const returnBookUseCase = require("./return-book.usecase");

describe("Return book UseCase", function () {
  const lendsRepository = {
    returnedBook: jest.fn(),
  };

  test("Must be able to return a book without fines", async function () {
    lendsRepository.returnedBook.mockResolvedValue({
      data_retorno: new Date("2024-02-16"),
    });

    const returnBookDTO = {
      emprestimo_id: "qualquer_id",
      data_devolucao: new Date("2024-02-16"),
    };

    const sut = returnBookUseCase({ lendsRepository });
    const output = await sut(returnBookDTO);

    expect(output.right).toBe("Multa por atraso: R$ 0");
    expect(lendsRepository.returnedBook).toHaveBeenCalledWith(returnBookDTO);
    expect(lendsRepository.returnedBook).toHaveBeenCalledTimes(1);
  });

  test("Must be able to return a book with fines", async function () {
    lendsRepository.returnedBook.mockResolvedValue({
      data_retorno: new Date("2024-02-15"),
    });

    const returnBookDTO = {
      emprestimo_id: "qualquer_id",
      data_devolucao: new Date("2024-02-16"),
    };

    const sut = returnBookUseCase({ lendsRepository });
    const output = await sut(returnBookDTO);

    expect(output.right).toBe("Multa por atraso: R$ 10,00");
    expect(lendsRepository.returnedBook).toHaveBeenCalledWith(returnBookDTO);
    expect(lendsRepository.returnedBook).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if lendsRepository is not provided", function () {
    expect(() => returnBookUseCase({})).toThrow(
      new AppError(AppError.dependencies)
    );
  });
  test("Must return a throw AppError if the required inputs are not provided is not provided", async function () {
    const sut = returnBookUseCase({ lendsRepository });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.requiredParams)
    );
  });
});
