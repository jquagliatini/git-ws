import { EurCurrency, Currency } from './currency';
import Amount from './Amount';
import Tx from './Tx';
import Ledger from './Ledger';

export default class BankAccount {
  private balance: Ledger;
  constructor(balance: number = -1, private currency: Currency = EurCurrency) {
    this.balance = new Ledger();

    if (balance > 0) {
      this.balance.push(
        new Tx(new Amount(balance * currency.cents_per_unit, currency)),
      );
    }
  }

  getFormattedBalance(): string {
    return this.balance.sum().toString();
  }

  getBalanceObject(): { amount: number; currency: string } {
    const balance: Amount = this.balance.sum();
    return {
      amount: balance.amount,
      currency: balance.currency.symbol,
    };
  }

  getBalance(): number {
    const balance: Amount = this.balance.sum();
    return balance.amount / balance.currency.cents_per_unit;
  }

  history(page: number = 0, size: number = 10): { a: any; d: number }[] {
    const start = page * size;
    return this.balance.slice(start, start + size).map((t) => t.json);
  }

  getTransaction(idx: number) {
    return this.balance.get(idx).json;
  }

  add(amount: number): BankAccount {
    // TODO
    return this;
  }

  sub(amount: number): BankAccount {
    // TODO
    return this;
  }
}
