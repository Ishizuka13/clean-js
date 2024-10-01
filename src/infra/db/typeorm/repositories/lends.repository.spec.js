const { typeormBooksRepository } = require("./books.repository");
const {
  lendsRepository,
  typeormLendsRepository,
} = require("./lends.repository");
const { typeormUsersRepository } = require("./users.repository");

describe("Lends Repository Typeorm", function () {
  let sut;

  beforeAll(function () {
    sut = lendsRepository();
  });

  beforeEach(async function () {
    await typeormLendsRepository.delete({});
    await typeormUsersRepository.delete({});
    await typeormBooksRepository.delete({});
  });

  const userDTO = {
    nome_completo: "qualquer_nome",
    CPF: "qualquer_CPF",
    telefone: "qualquer_telefone",
    email: "qualquer_email",
    endereco: "qualquer_endereco",
  };

  const bookDTO = {
    nome: "qualquer_nome",
    quantidade: 3,
    autor: "qulaquer_autor",
    genero: "qulaquer_genero",
    ISBN: "qulaquer_ISBN",
  };

  test("Must return void when created the lend", async function () {
    const user = await typeormUsersRepository.save(userDTO);

    const book = await typeormBooksRepository.save(bookDTO);

    const lendBook = await sut.lend({
      usuario_id: user.id,
      livro_id: book.id,
      data_retorno: "2024-01-27",
      data_saida: "2024-01-26",
    });

    expect(lendBook).toBeUndefined();
  });

  test("Must return the return date previously saved on the database", async function () {
    const user = await typeormUsersRepository.save(userDTO);

    const book = await typeormBooksRepository.save(bookDTO);

    const lend = await typeormLendsRepository.save({
      usuario_id: user.id,
      livro_id: book.id,
      data_saida: "2024-01-26",
      data_retorno: "2024-01-26",
    });

    const returnedBook = await sut.returnedBook({
      emprestimo_id: lend.id,
      data_devolucao: "2024-01-26",
    });

    expect(returnedBook.data_retorno).toBe(lend.data_retorno);
  });

  test("Must update the return date saved on the database", async function () {
    const user = await typeormUsersRepository.save(userDTO);

    const book = await typeormBooksRepository.save(bookDTO);

    const lend = await typeormLendsRepository.save({
      usuario_id: user.id,
      livro_id: book.id,
      data_saida: "2024-01-26",
      data_retorno: "2024-01-26",
    });

    await sut.returnedBook({
      emprestimo_id: lend.id,
      data_devolucao: "2024-01-26",
    });

    const findLendById = await typeormLendsRepository.findOneBy({
      id: lend.id,
    });

    expect(findLendById.data_devolucao).toBe("2024-01-26");
  });

  test("Must return the pending lends", async function () {
    const user = await typeormUsersRepository.save(userDTO);

    const book = await typeormBooksRepository.save(bookDTO);

    await typeormLendsRepository.save([
      {
        usuario_id: user.id,
        livro_id: book.id,
        data_saida: "2024-01-25",
        data_retorno: "2024-01-26",
        data_devolucao: "2024-01-26",
      },
      {
        usuario_id: user.id,
        livro_id: book.id,
        data_saida: "2024-01-26",
        data_retorno: "2024-01-27",
      },
    ]);

    const pendingLends = await sut.findPendings();

    expect(pendingLends).toHaveLength(1);
    expect(pendingLends[0].id).toBeDefined();
    expect(pendingLends[0].data_saida).toBe("2024-01-26");
    expect(pendingLends[0].data_retorno).toBe("2024-01-27");
    expect(pendingLends[0].data_devolucao).toBeUndefined();
    expect(pendingLends[0].usuario.nome_completo).toBe("qualquer_nome");
    expect(pendingLends[0].livro.nome).toBe("qualquer_nome");
  });

  test("Must return true if lend exists for user and book", async function () {
    const user = await typeormUsersRepository.save(userDTO);

    const book = await typeormBooksRepository.save(bookDTO);

    const lend = await typeormLendsRepository.save({
      usuario_id: user.id,
      livro_id: book.id,
      data_saida: "2024-01-26",
      data_retorno: "2024-01-26",
    });

    const isBookLendPendingUser = await sut.isBookISBNLendPendingUser({
      usuario_id: user.id,
      livro_id: book.id,
    });

    expect(isBookLendPendingUser).toBe(true);
  });

  test("Must return false if lend exists for user and book", async function () {
    const user = await typeormUsersRepository.save(userDTO);

    const book = await typeormBooksRepository.save(bookDTO);

    const isBookLendPendingUser = await sut.isBookISBNLendPendingUser({
      usuario_id: user.id,
      livro_id: book.id,
    });

    expect(isBookLendPendingUser).toBe(false);
  });

  test("Must return the lend find by user id and the book", async function () {
    const user = await typeormUsersRepository.save(userDTO);

    const book = await typeormBooksRepository.save(bookDTO);

    const lend = await typeormLendsRepository.save({
      usuario_id: user.id,
      livro_id: book.id,
      data_saida: "2024-01-26",
      data_retorno: "2024-01-26",
    });

    const findUserPendings = await sut.findPendingsByUserId(lend.id);

    expect(findUserPendings).toEqual({
      id: lend.id,
      data_saida: "2024-01-26",
      data_retorno: "2024-01-26",
      usuario: {
        nome_completo: "qualquer_nome",
        CPF: "qualquer_CPF",
        email: "qualquer_email",
      },
      livro: {
        nome: "qualquer_nome",
      },
    });
  });
});
