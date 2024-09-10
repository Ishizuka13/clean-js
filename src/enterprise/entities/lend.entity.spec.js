const lendEntity = require("./lend.entity");

describe("Lends entity", function () {
  test("calculateFine - no delay", function () {
    const output = lendEntity.calculateFine({
      data_devolucao: "2024-02-16",
      data_retorno: "2024-02-16",
    });

    expect(output).toBe("Multa por atraso: R$ 0");
  });
  test("calculateFine - no delay", function () {
    const output = lendEntity.calculateFine({
      data_devolucao: "2024-02-17",
      data_retorno: "2024-02-16",
    });

    expect(output).toBe("Multa por atraso: R$ 10,00");
  });
});
