import { deepEqual } from 'assert';
import { Currency, CurrencyError } from './currency';

export default class Amount {
  constructor(public amount: number, public currency: Currency) {}

  private hasSameCurrency(amount: Amount): boolean {
    try {
      deepEqual(amount.currency, this.currency);
      return true;
    } catch (e) {
      return false;
    }
  }

  add(amount: number | Amount): Amount {
    return this;
  }

  sub(amount: number | Amount): Amount {
    return this;
  }

  toString() {
    return (
      (this.amount / this.currency.cents_per_unit).toFixed(2) +
      this.currency.symbol
    );
  }
}
