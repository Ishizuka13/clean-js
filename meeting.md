## Reunião

Somos uma biblioteca pequena e gostaríamos de controlar a nossa entrada e saída de livros. Queremos cadastrar o usuário que irá pegar o livro emprestado, cadastrar os livros da nossa bibliotexa e poder emprestar os livros para qualquer usuário, além de buscar os registros de empréstimos.

## Dados

- Usuário: [nome_completo, CPF, telefone, endereço, email]
- Livro: [nome, quantidade, autor, gênero, ISBN]
- Empréstimo: [usuario_id, livro_id, data_retorno, data_devolucao, data_saida]

## UseCases (Regras de negócio)

[x] Cadastrar um novo usuário
[x] CPF ou email devem ser únicos

[x] Buscar um cadastro de usuário por CPF
[x] - Retornar um usuário vazio

[x] Cadastrar um novo livro
[x] - ISBN deve ser único

[x] Buscar um livro por nome ou ISBN
[x] - Retornar os livros ou vazio

[x] Emprestar um livro ao usuário
[x] - A data de retorno não pode ser menor que a data de saída
[x] - Um usuário não pode estar com mais de um livro com o mesmo ISBN ao mesmo tempo
[x] - Um usuário pode estar com mais de um livro com ISBN diferentes ao mesmo tempo
[x] - Ao cadastrar um empréstimo, será enviado um email automaticamente informando o nome do livro, nome do usuário, CPF, a data de saída e a data de retorno

[x] Devolver o livro emprestado sem multa
[x] - Caso o usuário tenha atrasado, será gerada uma multa fixa de R$10,00

[x] Mostrar todos os empréstimos pendentes, com o nome do livro, nome do usuário, CPF, data de saída e data de retorno. Ordenados pela data de retorno mais antinga

## Estruturas

## UsersRepository

[x] register: ({nome_completo, CPF, telefone, endereco, email}) => Promise<void>
[x] findByCPF(CPF) => Promise<User | null>
[x] CPFExists(CPF) => Promise<boolean>
[x] EmailExists(email) => Promise<boolean>

## booksRepository

[x] register: ({nome, quantidade, autor, genero, ISBN}) => Promise<void>
[x] ISBNExists: (ISBN) => Promise<boolean>
[x] findByNameOrISBN: (ISBN) => Promise<boolean>

## lendsRepository

[x] lend({ livro_id
usuario_id
data_saida
data_retorno}) => Promise<void>
[x] return: ({emprestimo_id, data_devolucao}) => Promise<data_retorno>
[] bookWithISBNIsPendentByUser: ({usuario_id, book_id}) => Promise<boolean> & {livro: {nome}, usuario: {nome_completo, CPF, email}}
