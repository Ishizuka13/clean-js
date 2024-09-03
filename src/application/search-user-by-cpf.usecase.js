const { Either } = require("../shared/errors");

module.exports = function searchUserByCPFUseCase({ usersRepository }) {
  return async function ({ CPF }) {
    const user = await usersRepository.searchByCPF(CPF);
    return Either.Right(user);
  };
};
