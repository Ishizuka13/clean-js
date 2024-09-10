const { AppError } = require("../../shared/errors");
const lendEntity = require("./lend.entity");

describe("Lends entity", function () {
  test("calculateFine - no delay", function () {
    const output = lendEntity.calculateFine({
      data_devolucao: "2024-02-16",
      data_retorno: "2024-02-16",
    });

    expect(output).toBe("Multa por atraso: R$ 0");
  });
  test("calculateFine - com delay", function () {
    const output = lendEntity.calculateFine({
      data_devolucao: "2024-02-17",
      data_retorno: "2024-02-16",
    });

    expect(output).toBe("Multa por atraso: R$ 10,00");
  });
  test("calculateFine - return a throw AppError if the required inputs are not provided", function () {
    expect(() => lendEntity.calculateFine({})).toThrow(
      new AppError(AppError.requiredParams)
    );
  });
});
