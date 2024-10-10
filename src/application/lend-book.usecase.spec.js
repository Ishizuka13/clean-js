const { Either, AppError } = require("../shared/errors");
const lendBookUseCase = require("./lend-book.usecase");

describe("Lend book UseCase", function () {
  const lendsRepository = {
    lend: jest.fn(),
    isBookISBNLendPendingUser: jest.fn(),
    findPendingsByUserId: jest.fn(),
  };

  const emailService = {
    emailSender: jest.fn(),
  };

  test("Must be able to lend a book", async function () {
    lendsRepository.lend.mockReturnValue("qualquer_id");
    lendsRepository.findPendingsByUserId.mockReturnValue({
      usuario: {
        nome: "qualquer_nome",
        CPF: "qualquer_CPF",
        email: "qualquer_email",
      },
      livro: {
        nome: "qualquer_nome_livro",
      },
    });

    const lendDTO = {
      livro_id: "qualquer_livro_id",
      usuario_id: "qualquer_usuario_id",
      data_saida: new Date("2024-02-16"),
      data_retorno: new Date("2024-02-16"),
    };

    const sut = lendBookUseCase({ lendsRepository, emailService });
    const output = await sut(lendDTO);

    expect(output.right).toBeNull();
    expect(lendsRepository.lend).toHaveBeenCalledWith(lendDTO);
    expect(lendsRepository.lend).toHaveBeenCalledTimes(1);
    expect(emailService.emailSender).toHaveBeenCalledWith({
      data_saida: lendDTO.data_saida,
      data_retorno: lendDTO.data_retorno,
      nome_usuario: "qualquer_nome",
      CPF: "qualquer_CPF",
      email: "qualquer_email",
      nome_livro: "qualquer_nome_livro",
    });
  });

  test("Must return an Either.left if return_date is lower than quit_date", async function () {
    const lendDTO = {
      livro_id: "qualquer_livro_id",
      usuario_id: "qualquer_usuario_id",
      data_saida: new Date("2024-02-16"),
      data_retorno: new Date("2024-02-15"),
    };

    const sut = lendBookUseCase({ lendsRepository, emailService });
    const output = await sut(lendDTO);

    expect(output.left).toBe(Either.ReturnDateLowerThanQuitDate);
    // expect(lendsRepository.lend).toHaveBeenCalledWith(lendDTO);
    // expect(lendsRepository.lend).toHaveBeenCalledTimes(1);
  });

  test("Must not allow the lending of a book with the same ISBN to the same user before the book has been returned", async function () {
    lendsRepository.isBookISBNLendPendingUser.mockResolvedValue(true);
    const lendDTO = {
      livro_id: "qualquer_livro_id",
      usuario_id: "qualquer_usuario_id",
      data_saida: new Date("2024-02-16"),
      data_retorno: new Date("2024-02-16"),
    };

    const sut = lendBookUseCase({ lendsRepository, emailService });
    const output = await sut(lendDTO);

    expect(output.left).toBe(Either.bookWithISBNIsPendentByUser);
    expect(lendsRepository.isBookISBNLendPendingUser).toHaveBeenCalledWith({
      livro_id: lendDTO.livro_id,
      usuario_id: lendDTO.usuario_id,
    });
    expect(lendsRepository.isBookISBNLendPendingUser).toHaveBeenCalledTimes(1);
  });

  test("Must return a throw AppError if the lendsRepository is not provided", function () {
    expect(() => lendBookUseCase({})).toThrow(
      new AppError(AppError.dependencies)
    );
  });

  test("Must return a throw AppError if a required inputs is not provided", async function () {
    const sut = lendBookUseCase({ lendsRepository, emailService });
    await expect(() => sut({})).rejects.toThrow(
      new AppError(AppError.requiredParams)
    );
  });
});
