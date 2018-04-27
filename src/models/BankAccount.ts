export default class BankAccount {
  private currency: string = 'EUR';
  private balance: number = 0;
  private centsPerUnit: number = 100;

  constructor(balance: number = 0, centsPerUnit: number = 100) {
    this.balance = balance;
    this.centsPerUnit = centsPerUnit;
  }

  getFormattedBalance(): string {
    return this.balance.toFixed(2) + this.currency;
  }

  getBalanceObject(): { amount: number; currency: string } {
    return {
      amount: this.balance * this.centsPerUnit,
      currency: this.currency,
    };
  }

  getBalance(): number {
    return this.balance;
  }
}
