/* tslint-env jest */
import BankAccount from '../../src/models/BankAccount';

describe('BankAccount', () => {
  const ba = new BankAccount(100);

  it('should display the balance', () => {
    expect(ba.getFormattedBalance()).toBe('100.00EUR');
  });

  it('should return the balance object', () => {
    expect(ba.getBalanceObject()).toEqual({
      amount: 100 * 100,
      currency: 'EUR',
    });
  });
});
