import AbstractCurrency from '../../../src/models/currency/AbstractCurrency';

class MockCurrency extends AbstractCurrency {
  constructor(amount: number) {
    super('FKC', 100, amount);
  }
}

describe('Currency', () => {
  it('should print correctly', () => {
    const c = new MockCurrency(100);
    expect(c.toString()).toBe('100.00FKC');
  });
});
