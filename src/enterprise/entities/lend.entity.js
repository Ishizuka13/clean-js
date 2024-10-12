const { AppError } = require("../../shared/errors");

const lendsEntity = function () {
  function calculateDaysLate({ data_retorno, data_devolucao }) {
    return (
      new Date(data_retorno).getTime() < new Date(data_devolucao).getTime()
    );
  }
  const calculateFine = function ({ data_retorno, data_devolucao }) {
    if (!data_devolucao || !data_retorno)
      throw new AppError(AppError.requiredParams);

    const daysLate = calculateDaysLate({
      data_retorno,
      data_devolucao,
    });
    return `Multa por atraso: R$ ${daysLate > 0 ? "10,00" : "0"}`;
  };
  return { calculateFine };
};

module.exports = lendsEntity();
