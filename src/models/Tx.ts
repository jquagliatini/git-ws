import Amount from './Amount';

export default class Tx {
  private txDate: number;
  constructor(public amount: Amount) {
    this.txDate = Date.now();
  }

  get json() {
    return {
      a: this.amount.json,
      d: this.txDate,
    };
  }
}
