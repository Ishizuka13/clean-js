/**
 * @description: ALERT: this class must be instanced directly, use one of the methods Left or Right
 */

module.exports = class Eihter {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  static Left(left) {
    return new Eihter(left, null);
  }
  static Right(right) {
    return new Eihter(null, right);
  }

  static valueAlreadyRegistered(value) {
    return { message: `${value} already registered` };
  }
};
