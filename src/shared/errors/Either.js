/**
 * @description: ALERT: this class must be instanced directly, use one of the methods Left or Right
 */

module.exports = class Either {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static Left(left) {
    return new Either(left, null);
  }
  static Right(right) {
    return new Either(null, right);
  }

  static valueAlreadyRegistered(value) {
    return { message: `${value} already registered` };
  }
  static ReturnDateLowerThanQuitDate() {
    return { message: "Data retorno menor do que saída" };
  }
  static bookWithISBNIsPendentByUser() {
    return {
      message: "Livro com ISBN já emprestado ao usuário e não retornado ainda.",
    };
  }
};
