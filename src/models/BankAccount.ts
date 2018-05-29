import { EurCurrency, Currency } from './currency';
import Amount from './Amount';

export default class BankAccount {
  private balance: Amount;
  constructor(balance: number = 0, currency: Currency = EurCurrency) {
    this.balance = new Amount(balance * currency.cents_per_unit, currency);
  }

  getFormattedBalance(): string {
    return this.balance.toString();
  }

  getBalanceObject(): { amount: number; currency: string } {
    return {
      amount: this.balance.amount,
      currency: this.balance.currency.symbol,
    };
  }

  getBalance(): number {
    return this.balance.amount / this.balance.currency.cents_per_unit;
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
