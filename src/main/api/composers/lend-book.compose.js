const lendBookUseCase = require("../../../application/lend-book.usecase");
const nodemailerService = require("../../../infra/db/email/nodemailer");
const {
  lendsRepository,
} = require("../../../infra/db/typeorm/repositories/lends.repository");
const lendBookController = require("../../../interface-adapters/Lend/lendBookController");

module.exports = async function lendBookCompose(httpRequest) {
  const lendsRepositoryFn = lendsRepository();

  const emailServiceFn = nodemailerService();

  const lendBookUseCaseFn = lendBookUseCase({
    lendsRepository: lendsRepositoryFn,
    emailService: emailServiceFn,
  });

  const controller = await lendBookController({
    lendBookUseCase: lendBookUseCaseFn,
    httpRequest,
  });

  return controller;
};
