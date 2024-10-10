const nodemailer = require("nodemailer");

module.exports = function nodemailerService() {
  const emailSender = async function ({
    data_saida,
    nome_usuario,
    data_retorno,
    CPF,
    email,
    nome_livro,
  }) {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a939d0dd7e0738",
        pass: "a9575ef698c3ee",
      },
    });

    const data_saida_BR = data_saida.toLocaleDateString("pt-BR");
    const data_retorno_BR = data_retorno.toLocaleDateString("pt-BR");

    await transporter.sendMail({
      from: '"Biblioteca UNI" <contato@uni.com',
      to: email,
      subject: "Novo livro emprestado",
      text: `Olá ${nome_usuario}(${CPF}, você pegou o livro '${nome_livro}' emprestado dia ${data_saida_BR} e deverá devolver dia ${data_retorno_BR}. Boa leitura!)`,
    });
  };

  return { emailSender };
};
